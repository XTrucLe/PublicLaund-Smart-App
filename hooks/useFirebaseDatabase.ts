// Import the functions you need from the SDKs you need
import { firebase } from "@react-native-firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getMessaging } from "firebase/messaging";
import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0XWbB3yx5ZgsZ2WUUvBu_1NFKv-N2SJg",
  authDomain: "laundrysystem-d73d7.firebaseapp.com",
  databaseURL:
    "https://laundrysystem-d73d7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "laundrysystem-d73d7",
  storageBucket: "laundrysystem-d73d7.firebasestorage.app",
  messagingSenderId: "586641361552",
  appId: "1:586641361552:web:f2eadcc833b20db9e0a615",
};

interface FirebaseState {
  app: any | null;
  firestoreDB: any | null;
  realtimeDB: any | null;
  messaging: any | null;
  projectId: string | null;
  token: string | null;
  error: string | null;
}

export const useFirebase = () => {
  const [firebaseState, setFirebaseState] = useState<FirebaseState>({
    app: null,
    firestoreDB: null,
    realtimeDB: null,
    messaging: null,
    projectId: null,
    token: null,
    error: null,
  });

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Kiểm tra xem Firebase đã được khởi tạo chưa
        const app =
          getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

        console.log("app", app, "12");
        // Khởi tạo Firestore và Realtime Database
        const firestoreDB = getFirestore();
        // const realtimeDB = getDatabase();
        // let firestoreDB = null;
        let realtimeDB = null;

        console.log("firestoreDB", firestoreDB);
        console.log("realtimeDB", realtimeDB);

        // Lấy projectId từ app
        const projectId = app.options.projectId ?? null;

        console.log("app", app);

        // Khởi tạo Firebase Messaging
        // const messaging = getMessaging(app);
        // console.log("messaging", messaging.app);

        // Lấy FCM Token
        // const token = await getToken(messaging, { vapidKey: "your-vapid-key" });

        let messaging = null;
        let token = null;

        // Cập nhật state với các giá trị đã khởi tạo
        setFirebaseState({
          app,
          firestoreDB,
          realtimeDB,
          messaging,
          projectId,
          token,
          error: null,
        });
      } catch (error) {
        console.error("Error initializing Firebase:", error);
        setFirebaseState((prevState: FirebaseState) => ({
          ...prevState,
          error: "Error initializing Firebase: " + (error as Error).message,
        }));
      }
    };

    initializeFirebase();
  }, []); // Chạy chỉ một lần khi component mount

  return firebaseState;
};
