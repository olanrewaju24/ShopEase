// src/context/AuthContext.jsx
import React, { useEffect, useState, useContext, createContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Keep track of the logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);   // ✅ now defined properly
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user: currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
