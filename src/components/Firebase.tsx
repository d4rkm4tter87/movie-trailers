// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDItxqq_jPhBeGRzYBpK0cbmTe4lfmtu2c",
  authDomain: "movbies-469fc.firebaseapp.com",
  projectId: "movbies-469fc",
  storageBucket: "movbies-469fc.appspot.com",
  messagingSenderId: "115676032518",
  appId: "1:115676032518:web:feb147e1decb8efbb21d87",
  measurementId: "G-XVR8ZLMNZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
