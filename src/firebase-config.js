// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-CmXOE2xyWteDWjlhpQ1m6MhyIhrHzd0",
  authDomain: "chat-app-62205.firebaseapp.com",
  projectId: "chat-app-62205",
  storageBucket: "chat-app-62205.appspot.com",
  messagingSenderId: "695794924826",
  appId: "1:695794924826:web:5c6502e783c9b00a0b00a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

