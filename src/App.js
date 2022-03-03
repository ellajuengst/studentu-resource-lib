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

// function App() {

//   const [resources, setResources] = useState([]); 
//   const [loading, setLoading] = useState(false);

//   const ref = firebase.firestore().collection("resources");
//   // console.log(ref);

//   function getResources() { // updates realtime?
//     setLoading(true);
//     ref.onSnapshot((querySnapshot) => {
//       const items = [];
//       querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//       });
//       setResources(items);
//       setLoading(false);
//     });
//   }

//   // function getResources2() {
//   //   setLoading(true);
//   //   ref.get().then((item) => {
//   //     const items = item.docs.map((doc) => doc.data());
//   //     setResources(items);
//   //     setLoading(false);
//   //   });
//   // }

//   useEffect(() => {
//     getResources();
//     // getResources2();
//   }, []);


//   if (loading) {
//     return <h1>Loading...</h1>;
//   }
 


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
