// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDgSMGmVi8xnuc0fF-71NdhBrD7HTUdLU",
  authDomain: "fanshub-48008.firebaseapp.com",
  databaseURL: "https://fanshub-48008-default-rtdb.firebaseio.com/",
  projectId: "fanshub-48008",
  storageBucket: "fanshub-48008.firebasestorage.app",
  messagingSenderId: "1014443553307",
  appId: "1:1014443553307:web:b69664fc0635efc5503ebe",
  measurementId: "G-E28MYJ8RWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Firebase Realtime Database and get a reference to the service
export const rtdb = getDatabase(app);

export default app;
