// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp} from "firebase/app";
import { getAuth,Auth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn6Wg4VOd4v2LuMlosMlSUUmQzzatDK7w",
  authDomain: "proyecto-final-907f8.firebaseapp.com",
  projectId: "proyecto-final-907f8",
  storageBucket: "proyecto-final-907f8.appspot.com",
  messagingSenderId: "77441514625",
  appId: "1:77441514625:web:d19a4f62facf4162106180",
  measurementId: "G-RPMLE28MV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {auth};

