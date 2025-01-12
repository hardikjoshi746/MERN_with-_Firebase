import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSV66VoDo15paX5_H4x0WRijIr5VMTbak",
  authDomain: "mernwithfirebase.firebaseapp.com",
  projectId: "mernwithfirebase",
  storageBucket: "mernwithfirebase.firebasestorage.app",
  messagingSenderId: "715419092380",
  appId: "1:715419092380:web:4860ecf7b15c4b027bb459",
  measurementId: "G-ZEMHZZ364W",
};

export const app = initializeApp(firebaseConfig);
