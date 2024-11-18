// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

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
  appId: "1:586641361552:web:f2eadcc833b20db9e0a615",
};

const projectId = firebaseConfig.projectId;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realtimeDB = getDatabase(app); // Khởi tạo Realtime Database
const messaging = getMessaging(app); // Khởi tạo messaging

export { app, realtimeDB, messaging, projectId };
