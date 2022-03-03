import firebase from 'firebase/compat/app' // appears that this is needed for firebase 9 update
import 'firebase/compat/firestore'; // haven't run into any problems with the import above, but may need to change to this

const firebaseConfig = {
    apiKey: "AIzaSyA9uM7OCNCGfU1W10dkaUPcUQxaGMIHrpI",
    authDomain: "studentu-resource-library.firebaseapp.com",
    projectId: "studentu-resource-library",
    storageBucket: "studentu-resource-library.appspot.com",
    messagingSenderId: "1029898704591",
    appId: "1:1029898704591:web:9a90dccffa368c118fc9ba",
    measurementId: "G-S9S34HQ1VN"
};
 
firebase.initializeApp(firebaseConfig);

export default firebase;

