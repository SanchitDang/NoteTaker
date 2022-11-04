// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlZvdk90b76Ngs5rH6IYYKfyZhBKk8X0g",
  authDomain: "notetaker-5143b.firebaseapp.com",
  projectId: "notetaker-5143b",
  storageBucket: "notetaker-5143b.appspot.com",
  messagingSenderId: "1023205220905",
  appId: "1:1023205220905:web:dc528fa2f488b6cbd13238",
  measurementId: "G-452YKYCZLV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


export default app;
