
// Firebase Init for CRONOS (client-side only)
// Uses ESM CDN imports suitable for GitHub Pages
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Config fournie par le client
const firebaseConfig = {
  apiKey: "AIzaSyBFWjU9m6I5DzQQMjh1bNIvybK5kLZbank",
  authDomain: "planification-agents-a-m.firebaseapp.com",
  projectId: "planification-agents-a-m",
  storageBucket: "planification-agents-a-m.firebasestorage.app",
  messagingSenderId: "231505901600",
  appId: "1:231505901600:web:1b6fa5576ec3de1714a445",
  measurementId: "G-43CLRXC1V3"
};

const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  if (await isSupported()) analytics = getAnalytics(app);
} catch(e) {
  // ignore analytics failure in unsupported contexts (e.g., http)
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Expose to app.js
window.CRONOS = { app, auth, db, storage, onAuthStateChanged, signInWithEmailAndPassword, signOut, doc, getDoc, setDoc };
