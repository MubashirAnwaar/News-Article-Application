// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "morning-dispatch-27410.firebaseapp.com",
  projectId: "morning-dispatch-27410",
  storageBucket: "morning-dispatch-27410.firebasestorage.app",
  messagingSenderId: "867158618169",
  appId: "1:867158618169:web:8750602cb4b8bda23a5de8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);