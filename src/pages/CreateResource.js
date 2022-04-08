import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {useNavigate} from "react-router-dom"
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {storage} from "../firebase"
import {ref, uploadBytes} from "firebase/storage";

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
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [tagList, setTagList] = useState([]);
  
  function addResource(values) {
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
      id: uuidv4(),
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
        items.push(doc.data());
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
      addResource(values)
    }
  }

  useEffect(() => {
    getCategoryList();
    getTagList();
  }, []);

  return (
  <div>
      <h1>Create Resource</h1>
      <div className="inputBox">
        <h3>Add New</h3>
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
        <Form.Control
          type="textarea"
          name="desc"
          placeholder = "Resource Description"
          value={values.desc}
          onChange={handleFormChange}
        />
        {formerrors.desc && (
          <p className="text-danger">{formerrors.desc}</p>
        )}
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
          <p className="text-danger">{formerrors.category}</p>
        )}
        <Typeahead
          id="tags"
          labelKey="name"
          multiple
          name="tags"
          onChange={handleTagChange}
          options={tagList}
          placeholder="Select tags"
          selected={values.tag}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select File OR Add a Link</Form.Label>
          <Form.Control 
            type="file" 
            name="attachment"
            onChange={handleFormChange}
          />
          <Form.Control 
            type="text" 
            name="link"
            value={values.link} 
            onChange={handleFormChange}
            placeholder="Paste the resource link"
          />
        </Form.Group>
        {formerrors.ref && (
          <p className="text-danger">{formerrors.ref}</p>
        )}
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <hr />
    </div>
  )
}
