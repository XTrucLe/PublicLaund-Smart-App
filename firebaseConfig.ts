// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { ref, get } from "firebase/database";// Required for side-effects


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0XWbB3yx5ZgsZ2WUUvBu_1NFKv-N2SJg",
  authDomain: "laundrysystem-d73d7.firebaseapp.com",
  databaseURL: "https://laundrysystem-d73d7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laundrysystem-d73d7",
  storageBucket: "laundrysystem-d73d7.appspot.com",
  messagingSenderId: "586641361552",
  appId: "1:586641361552:web:f2eadcc833b20db9e0a615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app); // Khởi tạo Firestore
const realtimeDB = getDatabase(app); // Khởi tạo Realtime Database

export { app, firestoreDB, realtimeDB };