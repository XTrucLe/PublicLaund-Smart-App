// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { ref, get } from "firebase/database";// Required for side-effects


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC0XWbB3yx5ZgsZ2WUUvBu_1NFKv-N2SJg",
//   authDomain: "laundrysystem-d73d7.firebaseapp.com",
//   databaseURL: "https://laundrysystem-d73d7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "laundrysystem-d73d7",
//   storageBucket: "laundrysystem-d73d7.appspot.com",
//   messagingSenderId: "586641361552",
//   appId: "1:586641361552:web:f2eadcc833b20db9e0a615"
// };

//test
const firebaseConfig = {
  apiKey: "AIzaSyCFy1FEDx0_NDST1FmiXo3XJN8OaJ_oVNI",
  authDomain: "publiclaund-smart.firebaseapp.com",
  databaseURL: "https://publiclaund-smart-default-rtdb.firebaseio.com",
  projectId: "publiclaund-smart",
  storageBucket: "publiclaund-smart.appspot.com",
  messagingSenderId: "855126604055",
  appId: "1:855126604055:web:4c55bd83af4c85135e1f52",
  measurementId: "G-7JH9QBC5X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app); // Khởi tạo Firestore
const realtimeDB = getDatabase(app); // Khởi tạo Realtime Database

export { app, firestoreDB, realtimeDB };