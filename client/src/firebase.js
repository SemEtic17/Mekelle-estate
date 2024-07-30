// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mekelle-estatee.firebaseapp.com",
  projectId: "mekelle-estatee",
  storageBucket: "mekelle-estatee.appspot.com",
  messagingSenderId: "485721388568",
  appId: "1:485721388568:web:ea6aedfdd1ca7d2c52b56d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);