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
  authDomain: "only-u-92072.firebaseapp.com",
  databaseURL: "https://only-u-92072-default-rtdb.firebaseio.com/",
  projectId: "only-u-92072",
  storageBucket: "only-u-92072.firebasestorage.app",
  messagingSenderId: "608349684129",
  appId: "1:608349684129:web:your-app-id-here",
  measurementId: "G-YOUR-MEASUREMENT-ID"
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
