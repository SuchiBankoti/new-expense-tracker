import './App.css';
import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Main from './Main';
import WelcomePage from './Welcome';
import ResetPassword from './Auth/ResetPassword';
import AddExpense from './ExpenseData/AddExpense';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new-expense-tracker" element={<Main/>} />
        <Route path="/new-expense-tracker/welcome-page" element={<WelcomePage />} />
        <Route path="/new-expense-tracker/reset-password" element={<ResetPassword />} />
        <Route path='/new-expense-tracker/add-expense' element={<AddExpense/>} />
      </Routes>
    </Router>
  );
}

export default App;
