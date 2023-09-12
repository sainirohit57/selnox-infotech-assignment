// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXOBYjllu0O_qti3iA85UQvFSbBhT6r-8",
  authDomain: "selnox-infotech-assignment.firebaseapp.com",
  projectId: "selnox-infotech-assignment",
  storageBucket: "selnox-infotech-assignment.appspot.com",
  messagingSenderId: "245072216318",
  appId: "1:245072216318:web:476610d2a482dc7042e5af",
  measurementId: "G-S6PJTM771B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
