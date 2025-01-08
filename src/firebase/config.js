//* Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

//* Add the Web App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyzOmsfLcgVd49wyy-WivENfoYnyGiUQA",
  authDomain: "lion444-3a468.firebaseapp.com",
  projectId: "lion444-3a468",
  storageBucket: "lion444-3a468.firebasestorage.app",
  messagingSenderId: "501857969195",
  appId: "1:501857969195:web:c86b453f7918b9f8b7766e",
  measurementId: "G-NEKD1KEF11",
};

//* Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

//* Initialize Firebase Auth and set persistence
const auth = getAuth(firebase_app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Failed to set session persistence:", error);
  });

export { auth };
export default firebase_app; 
