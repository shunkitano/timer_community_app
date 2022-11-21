import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGqh7O1l_lmj-QR7ecWGPcgI1lMfbTxxQ",
  authDomain: "time-community-app.firebaseapp.com",
  projectId: "time-community-app",
  storageBucket: "time-community-app.appspot.com",
  messagingSenderId: "932778162448",
  appId: "1:932778162448:web:e648e813be9c6c89b5cd95"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {db, auth, storage};