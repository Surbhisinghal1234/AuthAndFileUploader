// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCKpGfs3z9u7Wi0kCla49ZBotypfr8Vpog",
    authDomain: "login-form-50c7c.firebaseapp.com",
    projectId: "login-form-50c7c",
    storageBucket: "login-form-50c7c.appspot.com",
    messagingSenderId: "936310140629",
    appId: "1:936310140629:web:de0f0fc5272059c2af7c5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
