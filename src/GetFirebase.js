import React, { useState, useEffect, Fragment } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import {useAuth} from "./AuthContext"
import SignOut from "./SignOut"
import {useNavigate} from "react-router-dom"

function GetFirebase() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const {currentUser} = useAuth();
  const navigate = useNavigate();

  const ref = firebase.firestore().collection("resources");

  //ONE TIME GET FUNCTION
  function getResources2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setResources(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getResources2();
    // eslint-disable-next-line
  }, []);

  
  // ADD FUNCTION
  function addResource(newResource) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newResource.id) // set resource id
      .set(newResource)
      .then(() => {
        setResources((prev) => [newResource, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteResource(resource) {
    ref
      .doc(resource.id) 
      .delete()
      .then(() => {
        setResources((prev) =>
          prev.filter((element) => element.id !== resource.id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION NOT IMPLEMENTED YET
  function editResource(updatedResource) {
    setLoading();
    ref
      .doc(updatedResource.id) 
      .update(updatedResource)
      .then(() => {
        setResources((prev) =>
          prev.map((element) => {
            if (element.id !== updatedResource.id) {
              return element;
            }
            return updatedResource;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function navigateToSignIn() {
    navigate("/login");
  }

  return (
    <Fragment>
      {currentUser ? (
        <>
          <p>Admin Mode</p>
          <SignOut />
        </>
      ) : 
        <button onClick={navigateToSignIn}>
          Admin Login
        </button>
      }
      <h1>Resources (GET)</h1>
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
      {loading ? <h1>Loading...</h1> : null}
      {resources.map((resource) => (
        <div className="resource" key={resource.id}>
          <h2>{resource.title}</h2>
          <p>{resource.desc}</p>
          <div>
            <button onClick={() => deleteResource(resource)}>X</button>
            <button
              onClick={() =>
                editResource({ title: resource.title, desc, id: resource.id })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default GetFirebase;