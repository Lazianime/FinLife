import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./configuration/firebaseConfig.jsx";

import CoverPage from "./pages/CoverPage.jsx";
import AuthForm from './pages/auth/AuthForm.jsx'
import Home from './Home.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
