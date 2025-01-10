import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALimi6tc76YPZwzMjKe9eGqCQpUm2H2x8",
    authDomain: "modern-react-app-a9bcd.firebaseapp.com",
    projectId: "modern-react-app-a9bcd",
    storageBucket: "modern-react-app-a9bcd.appspot.com",
    messagingSenderId: "18914204349",
    appId: "1:18914204349:web:f2e8f8f9fd40bce15cb5d4"
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();
  const storage = getStorage();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {db,storage,auth,provider} 