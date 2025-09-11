import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvvkdp7xy8W_bdWjzDXd3q8bX61yXCl5I",
  authDomain: "shopease-75ad7.firebaseapp.com",
  projectId: "shopease-75ad7",
  storageBucket: "shopease-75ad7.appspot.com", // ✅ fixed
  messagingSenderId: "588179657305",
  appId: "1:588179657305:web:21b0824bf1d704aecf1748",
  measurementId: "G-CTV5Z4X5RM",
};

const app = initializeApp(firebaseConfig);

// Only enable analytics in browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);

export { app, auth, analytics };
