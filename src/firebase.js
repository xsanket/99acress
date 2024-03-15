// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd10jRbuRf-34EFJJQT_jBGzg1AKrsSho",
  authDomain: "acres-8ce6f.firebaseapp.com",
  projectId: "acres-8ce6f",
  storageBucket: "acres-8ce6f.appspot.com",
  messagingSenderId: "1000978521054",
  appId: "1:1000978521054:web:c2e66958556bcf98441b4f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();