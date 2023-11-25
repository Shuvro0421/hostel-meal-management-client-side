// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDnZp9FhSgQH2cdudRCxgDRIFODi7VKx4",
  authDomain: "hostel-meal-management-auth.firebaseapp.com",
  projectId: "hostel-meal-management-auth",
  storageBucket: "hostel-meal-management-auth.appspot.com",
  messagingSenderId: "578629243047",
  appId: "1:578629243047:web:9de562f7b95c2794428b82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth