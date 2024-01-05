import './App.css';
import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Main from "./Comps/Main";
import WelcomePage from './Comps/Welcome';
import ResetPassword from './Auth/ResetPassword';
import AddExpense from './ExpenseData/AddExpense';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/welcome-page" element={<WelcomePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/add-expense' element={<AddExpense/>} />
      </Routes>
    </Router>
  );
}

export default App;
