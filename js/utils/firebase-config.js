// Firebase SDK initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC46af_5xH17btmQ6UTewZnf3dgY0ZK2bA",
  authDomain: "lina-bunsu.firebaseapp.com",
  projectId: "lina-bunsu",
  storageBucket: "lina-bunsu.firebasestorage.app",
  messagingSenderId: "831125004814",
  appId: "1:831125004814:web:805644aa9156c013f9125f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export for other modules
export { app, db };
