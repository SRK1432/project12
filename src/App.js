import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Email from "./components/Email";
import EmailViewer from "./components/EmailViewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compose" element={<Email />} />
        <Route path="/inbox" element={<EmailViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
