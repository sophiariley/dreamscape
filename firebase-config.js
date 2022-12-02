import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXdO3bphsrtMMFJOZiBtOLW9mmt1xq2VI",
  authDomain: "dreamscapeofficial-ef560.firebaseapp.com",
  projectId: "dreamscapeofficial-ef560",
  storageBucket: "dreamscapeofficial-ef560.appspot.com",
  messagingSenderId: "807254456245",
  appId: "1:807254456245:web:1e2e848654275595e20bfc"
};

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);