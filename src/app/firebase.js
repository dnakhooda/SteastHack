// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYA38UtEURoSzEuUPXuque-Lau6EFl98I",
  authDomain: "steast-hackathon.firebaseapp.com",
  projectId: "steast-hackathon",
  storageBucket: "steast-hackathon.firebasestorage.app",
  messagingSenderId: "926165094246",
  appId: "1:926165094246:web:98b4477669b8ab841bc2a7",
  measurementId: "G-XTQ2Q6BSW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);