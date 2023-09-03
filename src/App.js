import './App.css';
import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Main from './Main';
import WelcomePage from './Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/welcome-page" element={<WelcomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
