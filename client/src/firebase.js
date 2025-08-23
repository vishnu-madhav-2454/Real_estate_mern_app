// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "resume-project-7afe6.firebaseapp.com",
  projectId: "resume-project-7afe6",
  storageBucket: "resume-project-7afe6.firebasestorage.app",
  messagingSenderId: "664744611217",
  appId: "1:664744611217:web:51a259655301eb31bd9e30"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);