// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnTpdr3x8oiQBT3peZyrLcQUaQyPXp3wA",
  authDomain: "netflixgpt-31248.firebaseapp.com",
  projectId: "netflixgpt-31248",
  storageBucket: "netflixgpt-31248.firebasestorage.app",
  messagingSenderId: "1028444970332",
  appId: "1:1028444970332:web:e2cfa52f1f46ebd0b9b599",
  measurementId: "G-0LLDRGJBDN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
