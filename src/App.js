import './App.css';
import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Main from './Main';
import WelcomePage from './Welcome';
import ResetPassword from './Auth/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/welcome-page" element={<WelcomePage />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
