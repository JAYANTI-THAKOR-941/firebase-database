// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUf_VV7Dk8ktjFP8hauv1gPVRNZneKGcw",
  authDomain: "fir-database-6c410.firebaseapp.com",
  projectId: "fir-database-6c410",
  storageBucket: "fir-database-6c410.firebasestorage.app",
  messagingSenderId: "988147621992",
  appId: "1:988147621992:web:0bb2fe1ec514546a3a9bdd",
  measurementId: "G-ZL4L9KP5M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const analytics = getAnalytics(app);


export default app;