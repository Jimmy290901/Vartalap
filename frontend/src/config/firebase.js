/* This File contains Firebase Config object, 
which contains keys and identifiers 
for your Firebase project 
Get it from - Project Settings > SDK setup and Configuration > Config
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYGqA5suLTRZx1jb3hwLWogFjv7ucAsZc",
  authDomain: "whatsapp-mern-432ab.firebaseapp.com",
  projectId: "whatsapp-mern-432ab",
  storageBucket: "whatsapp-mern-432ab.appspot.com",
  messagingSenderId: "214057029356",
  appId: "1:214057029356:web:a78d49f9614d7bce19dfc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);