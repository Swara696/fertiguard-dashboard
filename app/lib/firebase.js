// app/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFzqBISQYz06qAyY1SbDvIg8QgKEao2tg",
  authDomain: "fertiguard.firebaseapp.com",
  projectId: "fertiguard",
  storageBucket: "fertiguard.firebasestorage.app",
  messagingSenderId: "733576656662",
  appId: "1:733576656662:web:cee7342184aa341e484237",
  databaseURL: "https://fertiguard-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);  // 👈 only this export