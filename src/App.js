// import './App.css';
// import firebase from 'firebase/compat/app'; // appears that this is needed for firebase 9 update
// import 'firebase/compat/firestore'; // haven't run into any problems with the import above, but may need to change to this
// import React, {useState, useEffect} from "react";
// import {} from "./firebase";

import React, {Fragment} from "react";
import GetFirebase from "./GetFirebase";
import SnapshotFirebase from "./SnapshotFirebase";

function App() {
  const get = false;
  // const get = true; // requires you to refresh to update
  return <Fragment>{get ? <GetFirebase /> : <SnapshotFirebase /> } </Fragment>
}

export default App;


//   return (
//     // <div className = "App">
//     //   <h1> #firebase firestore database </h1>
//     // </div>
//     < div>
//       <h1>Resources</h1>
//       {resources.map((resource) => (
//         <div key = {resource.id}>
//           <h2>{resource.title}</h2>
//           <p>{resource.summary}</p>
          
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
