import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPdJALj4gSP1bYq1Qb1pxp3f_kD06vnjI",
    authDomain: "testprojecttut.firebaseapp.com",
    projectId: "testprojecttut",
    storageBucket: "testprojecttut.appspot.com",
    messagingSenderId: "115582004192",
    appId: "1:115582004192:web:1a48d5781e1b842e90d985",
    measurementId: "G-Q04J24L3XG"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);