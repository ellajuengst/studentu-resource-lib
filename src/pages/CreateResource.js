import React, { useState, useEffect, Fragment } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {useNavigate} from "react-router-dom"

export default function CreateResource() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const ref = firebase.firestore().collection("resources");
  const navigate = useNavigate();
  
  function addResource(newResource) {

    ref
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

  return (
    <div>
    <h1>Create Resource</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <input
          type="text"
          placeholder = "Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addResource({title, desc, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <hr />
    </div>
  )
}
