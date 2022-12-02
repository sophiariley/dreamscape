import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQfGUm8m_xCI6reoq0KDFRxYR7ARQkW48",
  authDomain: "accountcreate-b2ae6.firebaseapp.com",
  projectId: "accountcreate-b2ae6",
  storageBucket: "accountcreate-b2ae6.appspot.com",
  messagingSenderId: "258288834486",
  appId: "1:258288834486:web:5c195eb3162bda078bd317",
  measurementId: "G-ZWHL678E50"
};

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);