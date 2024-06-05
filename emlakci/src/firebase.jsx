// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDQ2jgF7cbSUcoANUFGS9qtxzoRDW2_EQ",
    authDomain: "emlakci-f830f.firebaseapp.com",
    projectId: "emlakci-f830f",
    storageBucket: "emlakci-f830f.appspot.com",
    messagingSenderId: "642844151474",
    appId: "1:642844151474:web:e7cd09ae946b711d5ec3ab",
    measurementId: "G-9S3J95FBY5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get the Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword };