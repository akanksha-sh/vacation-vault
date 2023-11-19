// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWK5tLQFhsNx64ZT0SlSUy5LgqGpnEbIM",
  authDomain: "holiday-tracker-8e1b1.firebaseapp.com",
  projectId: "holiday-tracker-8e1b1",
  storageBucket: "holiday-tracker-8e1b1.appspot.com",
  messagingSenderId: "52604230657",
  appId: "1:52604230657:web:2b8d4adeb6ace72ed73400",
  measurementId: "G-CRS6S4XQV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)