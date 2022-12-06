import firebase from 'firebase/app'
import 'firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMnEVDz3SuqlJg3A49YNDOwL21bAcKUYE",
  authDomain: "react-firebase-heroes.firebaseapp.com",
  projectId: "react-firebase-heroes",
  storageBucket: "react-firebase-heroes.appspot.com",
  messagingSenderId: "875703820",
  appId: "1:875703820:web:3bd8782b25221e25480829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)