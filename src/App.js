import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Email from "./components/Email";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </Router>
  );
}

export default App;
