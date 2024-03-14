// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBfeuNMX0APGt38cpuckfCUaq89au__DOM",
  authDomain: "wright-4d6f6.firebaseapp.com",
  projectId: "wright-4d6f6",
  storageBucket: "wright-4d6f6.appspot.com",
  messagingSenderId: "1056987993255",
  appId: "1:1056987993255:web:d9ce6c6752f32c2f02b782",
  measurementId: "G-1GBRCNMXR8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);