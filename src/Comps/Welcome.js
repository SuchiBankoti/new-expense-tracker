import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Navbar from "./Navbar";
import DownloadButton from "../ExpenseData/Download";
import "../CSS/Welcome.css"
import Expense from "../ExpenseData/Expense";

export default function WelcomePage() {
  const { allExpenses, totalAmount } = useSelector((state) => state.expense)


    return (
    <div className="welcome-page">
        <Navbar />
        <div className="dashboard">
          <div className="balance">
            {totalAmount ?
              <div className="balance">
                <img src={process.env.PUBLIC_URL + '/image/m.png'}  alt="money" className="coin-img"/>
              <div>Balance</div>
              <div>${totalAmount}</div>
            </div> : ""}
         </div>
            
                     
        <div className='expense-content'>
            <div className="subtitle">
             Recent Expenses
            </div>
            {allExpenses.length > 0 ?
              <div className="expenses">
                {allExpenses.map((expense,i)=> <Expense expense={expense} key={i} />)}
              </div>
              : <p className="table-text">No current expenses</p>}
          </div>
        </div>
        </div>
    )
}