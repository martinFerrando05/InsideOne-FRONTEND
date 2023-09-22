// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAStNS8h1bNdDQCKNniGXI-cVvNp1nRfPo",
  authDomain: "prueba-97c35.firebaseapp.com",
  projectId: "prueba-97c35",
  storageBucket: "prueba-97c35.appspot.com",
  messagingSenderId: "480486330281",
  appId: "1:480486330281:web:c3ba0e4ab8c11b7cf2beb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)