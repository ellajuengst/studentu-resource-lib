// import './App.css';
// import firebase from 'firebase/compat/app'; // appears that this is needed for firebase 9 update
// import 'firebase/compat/firestore'; // haven't run into any problems with the import above, but may need to change to this
// import React, {useState, useEffect} from "react";
// import {} from "./firebase";

import {React} from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import GetFirebase from "./GetFirebase";
import SnapshotFirebase from "./SnapshotFirebase";
import {AuthProvider} from "./AuthContext";
import SignIn from "./pages/SignIn"
import ResourceLibrary from "./pages/ResourceLibrary"
import CreateResource from "./pages/CreateResource"
import EditResource from "./pages/EditResource"

import Resource from "./pages/Resource"

function App() {
  const get = false;
  // const get = true; // requires you to refresh to update
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={get ? <GetFirebase /> : <ResourceLibrary /> }/>
          <Route path="/login" element={<SignIn />} />
          <Route path="/create-resource" element={<CreateResource />} />
          <Route path="/edit-resource" element={<EditResource />} />
          <Route path="/resource/:id" element={<Resource />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App;
