// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9xKfCzaWikyTcNAFTlslMFdAXK_NjPj8",
  authDomain: "letsworkout-f283c.firebaseapp.com",
  projectId: "letsworkout-f283c",
  storageBucket: "letsworkout-f283c.appspot.com",
  messagingSenderId: "1084560906939",
  appId: "1:1084560906939:web:c324b7a264a75a0934279e",
  measurementId: "G-W9QK8VV0S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };