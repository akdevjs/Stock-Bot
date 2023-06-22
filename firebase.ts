// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqwb3l4Z0mHr7orwXeHOcBtko1dREHjMg",
  authDomain: "stock-bot-e1aa7.firebaseapp.com",
  projectId: "stock-bot-e1aa7",
  storageBucket: "stock-bot-e1aa7.appspot.com",
  messagingSenderId: "75815150478",
  appId: "1:75815150478:web:9cae6e73ae9c381e5c7adf",
  measurementId: "G-SXP8GHJGCC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
