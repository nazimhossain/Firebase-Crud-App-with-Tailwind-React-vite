// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKe9-SZu1FFiOPDWyuZ4m9J7bNmzQdUCs",
  authDomain: "react-contacts-e4719.firebaseapp.com",
  projectId: "react-contacts-e4719",
  storageBucket: "react-contacts-e4719.appspot.com",
  messagingSenderId: "26736471853",
  appId: "1:26736471853:web:a51d8d572fe43482c4ada4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
