// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvYhmn5l5jGhYKkSt2lrV53kknEZ7ES1U",
    authDomain: "ex04-e38b7.firebaseapp.com",
    projectId: "ex04-e38b7",
    storageBucket: "ex04-e38b7.appspot.com",
    messagingSenderId: "848245779642",
    appId: "1:848245779642:web:b4d300761593c3a9e52683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, db, storage, auth, googleProvider, facebookProvider };