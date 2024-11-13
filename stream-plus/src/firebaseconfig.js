// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnCgkHNLVZmykrPdfZwZnoRgcP9vZMqt8",
    authDomain: "streampl-f7a40.firebaseapp.com",
    projectId: "streampl-f7a40",
    storageBucket: "streampl-f7a40.appspot.com",
    messagingSenderId: "153868394182",
    appId: "1:153868394182:web:2e17ae6607452aabef81c7",
    measurementId: "G-0SPKP3NE0J"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { storage, auth, analytics, firestore};