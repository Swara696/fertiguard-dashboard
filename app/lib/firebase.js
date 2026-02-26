import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFzqBISQYz06qAyY1SbDvIg8QgKEao2tg",
  authDomain: "fertiguard.firebaseapp.com",
  databaseURL: "https://fertiguard-default-rtdb.firebaseio.com/",
  projectId: "fertiguard",
  storageBucket: "fertiguard.appspot.com",
  messagingSenderId: "dummy",
  appId: "dummy"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);