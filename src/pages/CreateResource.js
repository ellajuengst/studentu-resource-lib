import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {useNavigate} from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {storage} from "../firebase"
import {ref, uploadBytes,getDownloadURL} from "firebase/storage";

export default function CreateResource() {
  const [values, setValues] = useState({
    title: "",
    desc: "",
    tags: [],
    category: "",
    link: "",
    attachment: null,
  })
  const [formerrors, setFormErrors] = useState({});

  const resourceRef = firebase.firestore().collection("resources");
  const tagRef = firebase.firestore().collection("tags");
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);

  function addResource() {
    let type, reference;
    const refID = uuidv4()
    if(values.attachment != null) {
      type = "attachment"
      reference = refID;
      const fileRef = ref(storage, refID);
      uploadBytes(fileRef, values.attachment)
    } else {
      type = "link"
      reference = values.link;
    }
    const newResource = {
      title: values.title,
      desc: values.desc,
      type,
      reference,
      category: values.category,
      tags: values.tags,
      id: uuidv4()
    }
    resourceRef
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newResource.id) // set resource id
      .set(newResource)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addTag(tagName) {
    const newTag = {
      name: tagName, 
    }
    tagRef.add(newTag);
  }

  function getCategoryList() {
    firebase.firestore().collection("categories").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCategoryList(items);
    });
  }

  function getTagList() {
    firebase.firestore().collection("tags").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().name);
      });
      setTagList(items);
    });
  }

  const handleFormChange = (event) => {
    if(event.target.name === "attachment") {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.files[0],
      }));
    }
    else {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
     }
   };

   const handleTagChange = (tags) => {
    for(let i = 0; i < tags.length; i++){
      if(typeof tags[i] !== 'string') {
        tags[i] = tags[i].name;
        console.log(tags[i])
      }
    }
    setValues((values) => ({
      ...values,
      tags: tags,
    }));
   }

   const validate = () => {
     let errors = {};
     if(values.title === "") {
       errors.title = "Resource title is required"
     }
     if(values.desc === "") {
      errors.desc = "Short description of resource is required"
     }
     if(values.category === "" || values.category === "Select a Category") {
      errors.category = "Category for resource must be selected"
     }
     if(values.tags === []) {
      // if tags are required
     }
     if(values.attachment === null && values.link === "") {
      errors.ref = "Attachment or link of resource must be added"
     }
     else if(values.attachment !== null && values.link !== "") {
      errors.ref = "Cannot add a link and attachment for resource, must remove one"
     }
     setFormErrors(errors)
     if(Object.keys(errors).length === 0) {
      return true;
     }
     else {
       return false;
     }
   }
  
  const handleSubmit = () => {
    if(validate(values)) {
      for(const tag of values.tags) {
        if(!tagList.includes(tag)) {
          addTag(tag)
        }
      }
      addResource(values)
    }
  }

  useEffect(() => {
    getCategoryList();
    getTagList();
  }, []);

  return (
  
  <div data-testid="create-resource">
    <div className='back-home'>
      <Button variant="link" onClick={() => {navigate('/')}} className="back-btn">&laquo; Exit</Button>
    </div>
    <div className="add-r-Container">
        <h1>Create Resource</h1>
        <div className="inputBox">
          <h3>Add New Resource Information</h3>
          <Form.Group className="form-group">
            <Form.Label>Resource Title <span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder = "Resource Title"
              value={values.title}
              onChange={handleFormChange}
            />
            {formerrors.title && (
              <p className="text-danger">{formerrors.title}</p>
            )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Resource Description <span className="required">*</span></Form.Label>
            <Form.Control
              type="textarea"
              as="textarea"
              name="desc"
              placeholder = "Resource Description"
              value={values.desc}
              onChange={handleFormChange}
            />
            {formerrors.desc && (
              <p className="text-danger">{formerrors.desc}</p>
            )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Category <span className="required">*</span></Form.Label>
          <Form.Select
            id="category" 
            name="category"
            value={values.category}
            onChange={handleFormChange}
          >
            <option>Select a Category</option>
            {categoryList.map(
              (category) => (
                <option value={category.id}>{category.name}</option>
              )
            )}
          </Form.Select>
          {formerrors.category && (
            <p data-testid="category-error" className="text-danger">{formerrors.category}</p>
          )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Tags</Form.Label>
            <Typeahead
              allowNew
              id="tags"
              labelKey="name"
              multiple
              name="tags"
              newSelectionPrefix="Select to add a new tag: "
              onChange={handleTagChange}
              options={tagList}
              placeholder="Select tags"
              selected={values.tags}
            />
          </Form.Group>
          
          
          <Form.Group controlId="formFile" className="mb-3 form-group">
            <Form.Label>Select File <b>OR</b> Add a Link <span className="required">*</span></Form.Label>
            <Form.Control 
              type="file" 
              name="attachment"
              onChange={handleFormChange}
            />
            <div className="flex-center"><hr style={{color: "black", width: "40%"}} /><b className="or">OR</b><hr style={{color: "black", width: "40%"}} /></div>
            <Form.Control 
              type="text" 
              name="link"
              value={values.link} 
              onChange={handleFormChange}
              placeholder="Paste the resource link"
            />
            {formerrors.ref && (
            <p className="text-danger">{formerrors.ref}</p>
            )}
          </Form.Group>
          <div className="btn-holder">
            <Button data-testid="submit-button" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        
        </div>
        <hr />
      </div>
    </div>
  )
}
