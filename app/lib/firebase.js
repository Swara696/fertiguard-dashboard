import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFzqBISQYz06qAyY1SbDvIg8QgKEao2tg",
  authDomain: "fertiguard.firebaseapp.com",
  projectId: "fertiguard",
  storageBucket: "fertiguard.firebasestorage.app",
  messagingSenderId: "733576656662",
  appId: "1:733576656662:web:cee7342184aa341e484237"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

