// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg2GokmZnivtv9pjRgYuksyA38afOrXiU",
  authDomain: "skillswap-ce6f9.firebaseapp.com",
  projectId: "skillswap-ce6f9",
  storageBucket: "skillswap-ce6f9.firebasestorage.app",
  messagingSenderId: "474339154909",
  appId: "1:474339154909:web:8adc585e201b331aca7434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth};