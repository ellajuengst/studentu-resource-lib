import {React} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={get ? <GetFirebase /> : <ResourceLibrary /> }/>
          <Route path="/login" element={<SignIn />} />
          <Route path="/create-resource" element={<CreateResource />} />
          <Route path="/edit-resource" element={<EditResource />} />
          <Route path="/resource/:id" element={<Resource />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
