// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airbnb-c8533.firebaseapp.com",
  projectId: "airbnb-c8533",
  storageBucket: "airbnb-c8533.appspot.com",
  messagingSenderId: "426250003031",
  appId: "1:426250003031:web:4bc0f8f3c296a8c183f912",
  measurementId: "G-KXXVHT7XFX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
