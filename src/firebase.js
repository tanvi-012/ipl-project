// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd0WaASK3pMSkjIC9wgi4foinF7JWjXCs",
  authDomain: "ipl-activity.firebaseapp.com",
  projectId: "ipl-activity",
  storageBucket: "ipl-activity.appspot.com",
  messagingSenderId: "962686093133",
  appId: "1:962686093133:web:acf730cc4184ab36c35904",
  measurementId: "G-8JXWW0REHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

