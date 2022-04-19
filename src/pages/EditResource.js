import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { storage } from "../firebase"
import { deleteObject, ref, uploadBytes} from "firebase/storage";

export default function EditResource(updatedResource) {
  const { state } = useLocation();

  const [values, setValues] = useState({
    // key-value pairs of resource
    id: state.source.id,
    title: state.source.title,
    desc: state.source.desc,
    category: state.source.category,
    tags: state.source.tags,

    type: state.source.type,
    reference: state.source.reference,

    // basically need if type is link, then we do link: state.source.reference
    link: ((state.source.type == "link") ? state.source.reference : ""),

    // if type is attachment, then we do attachmentid: state.source.reference and attachment: will not be null
    // non-key-value pair of resource
    attachment: ((state.source.type == "attachment") ? ref(storage, state.source.reference) : null)
    // attachment: null
})

const [formerrors, setFormErrors] = useState({});
const [loading, setLoading] = useState(false);
const resourceRef = firebase.firestore().collection("resources");
const [resources, setResources] = useState([]);
const navigate = useNavigate();

const [categoryList, setCategoryList] = useState([]);
const [tagList, setTagList] = useState([]);

function editResource(values) {
  // const refID = uuidv4()
  // if (values.attachment != null) {
  //   values.type = "attachment"
  //   values.reference = refID;
  //   const fileRef = ref(storage, refID);
  //   uploadBytes(fileRef, values.attachment)
  // }
  
  const updatedResource = {
    id: values.id,
    title: values.title,
    desc: values.desc,
    category: values.category,
    tags: values.tags.map((tag) => (typeof tag == "string" ? tag : tag.name)),
    // tags: values.tags,
    reference: values.link, // attachment = string id of storage, link = string url
    type: values.type // either attachment or link
  }

  setLoading();
  resourceRef
    .doc(updatedResource.id)
    .update(updatedResource)
    .then(() => {
      // setResources((prev) =>
      //   prev.map((element) => {
      //     if (element.id !== updatedResource.id) {
      //       return element;
      //     }
      //     return updatedResource;
      //   })
      // );
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
      items.push(doc.data().name);
    });
    setTagList(items);
  });
}

const handleFormChange = (event) => {
  if (event.target.name === "attachment") {
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
    }
  }
  setValues((values) => ({
    ...values,
    tags: tags,
  }));
}

const validate = () => {
  let errors = {};
  if (values.title === "") {
    errors.title = "Resource title is required"
  }
  if (values.desc === "") {
    errors.desc = "Short description of resource is required"
  }
  if (values.category === "" || values.category === "Select a Category") {
    errors.category = "Category for resource must be selected"
  }
  if (values.tags === []) {
    // if tags are required
  }
  if (values.attachment === null && values.link === "") {
    errors.ref = "Attachment or link of resource must be added"
  }
  else if (values.attachment !== null && values.link !== "") {
    errors.ref = "Cannot add a link and attachment for resource, must remove one"
  }
  setFormErrors(errors)
  if (Object.keys(errors).length === 0) {
    return true;
  }
  else {
    return false;
  }
}

function addTag(tagName) {
  const newTag = {
    name: tagName, 
  }
  firebase.firestore().collection("tags").add(newTag);
}

const handleUpdate = () => {
  if(validate(values)) {
    for(const tag of values.tags) {
      if(!tagList.includes(tag)) {
        addTag(tag)
      }
    }
    editResource(values)
  }
}

async function deleteResource() {
  // delete attachment from stoage if applicable
  if(values.type == "attachment") {
    const fileRef = ref(storage, values.reference);
    deleteObject(fileRef)
  }

  // delete resource document from collection
  resourceRef
    .doc(values.id)
    .delete()
    .then(() => {
      navigate('/')
    })
    .catch((err) => {
      console.error(err);
    });
}

useEffect(() => {
  getCategoryList();
  getTagList();
}, []);

return (
  <div>
    <h1>Edit Resource</h1>
    <div className="inputBox">
      <label for="title" >Title</label>
      <Form.Control
        type="text"
        name="title"
        placeholder="Resource Title"
        value={values.title}
        onChange={handleFormChange}
      />
      {formerrors.title && (
        <p className="text-danger">{formerrors.title}</p>
      )}

      <label for="desc" >Description</label>
      <Form.Control
        type="textarea"
        name="desc"
        placeholder="Resource Description"
        value={values.desc}
        onChange={handleFormChange}
      />
      {formerrors.desc && (
        <p className="text-danger">{formerrors.desc}</p>
      )}

      <label for="category" >Category</label>
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

      <label for="tags" >Tags</label>
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
      <button onClick={handleUpdate}>
        Update
      </button>
      <Button variant="danger" onClick={deleteResource}>Delete Resource</Button>
    </div>
    <hr />
  </div>
)
}
