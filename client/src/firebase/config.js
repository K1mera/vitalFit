// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Mo2SKOIkWYyaDDw4iILnjdXb8Q_ZjKU",
  authDomain: "vitalfitapp-77225.firebaseapp.com",
  projectId: "vitalfitapp-77225",
  storageBucket: "vitalfitapp-77225.appspot.com",
  messagingSenderId: "558817686410",
  appId: "1:558817686410:web:b1cd87acbf95af845ace73",
  measurementId: "G-62Y0Q89LME",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);


