// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFy1FEDx0_NDST1FmiXo3XJN8OaJ_oVNI",
  authDomain: "publiclaund-smart.firebaseapp.com",
  databaseURL: "https://publiclaund-smart-default-rtdb.firebaseio.com",
  projectId: "publiclaund-smart",
  storageBucket: "publiclaund-smart.appspot.com",
  messagingSenderId: "855126604055",
  appId: "1:855126604055:web:4c55bd83af4c85135e1f52",
  measurementId: "G-7JH9QBC5X1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app); // Khởi tạo Firestore
const realtimeDB = getDatabase(app); // Khởi tạo Realtime Database

export { app, firestoreDB, realtimeDB };
