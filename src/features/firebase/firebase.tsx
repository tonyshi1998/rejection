// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// import {service} from 'firebase/service'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1CYEBSc9AHLnNj-UcJnEwytQnDiXnm7c",
  authDomain: "rejection-643cb.firebaseapp.com",
  projectId: "rejection-643cb",
  storageBucket: "rejection-643cb.appspot.com",
  messagingSenderId: "783716621800",
  appId: "1:783716621800:web:f327817a5fb3b81018585d",
  measurementId: "G-TEEWBZYD7L"
};

// Initialize Firebase
// export const fbApp = initializeApp(firebaseConfig);
// export const fbAnalytics = getAnalytics(fbApp);
// export const fbAuth = getAuth(fbApp);

export const initializeFb = () => {
    if (typeof window === 'undefined') return;
    return initializeApp(firebaseConfig);

}