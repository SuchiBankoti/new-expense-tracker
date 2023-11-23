import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { activatePremium, getAllExpenses,   setUsername} from "./Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Navbar from "./Navbar";
import DownloadButton from "./ExpenseData/Download";
import { FaPlusCircle } from 'react-icons/fa';
import "./Welcome.css"

export default function WelcomePage() {
  const {allExpenses,username,totalAmount,theme,premium} = useSelector((state) => state.expense)
  const dispatch = useDispatch()
    useEffect(() => {
        if (username) {
          dispatch(getAllExpenses(username))
        } else {
          const localname = localStorage.getItem("expenseUsername")
            dispatch(getAllExpenses(localname))
          dispatch(setUsername())
        }
    }, [username])
    console.log(allExpenses)
   


    return (
        <div className="welcomePage" style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            <Navbar/>
            <div className={theme==='dark'?"add-expense-container-active":"add-expense-container"}>
                <div>Add Expense</div>
                   <Link to="/new-expense-tracker/add-expense">
                <FaPlusCircle className="icon" style={{color:theme==="light"?"black":"white"}}/>
                   </Link>
            </div>
            <div className={theme==='dark'?"table-active":"table"}>
          <table border="1" className={theme==='dark'? "main-table-active":"main-table"}>
            <thead className={theme==='dark'?"table-heading-active":"table-heading"}>
             <p>Expense List</p> 
              <div className="download-btn">
                <DownloadButton/>
          </div>
            </thead>
            {allExpenses.length > 0 ? <tbody>
              {allExpenses.map((expense) => (
                <tr key={nanoid()} className={theme==='dark'?"table-row-active":"table-row"}>
                  <td className={theme==='dark'? "table-text-active":"table-text"}>{expense.category}</td>
                  <td className={theme==='dark'? "table-text-active":"table-text"}>{expense.detail}</td>
                  <td className={theme==='dark' ? "table-text-active":"table-text"}>{expense.cost}</td>
                </tr>
              ))}
            </tbody> : <tbody><tr className={theme==='dark'?"table-row-active":"table-row"}><td className={theme === 'dark' ? "table-text-active" : "table-text"}>No current expenses</td></tr></tbody>}
                   </table>
                    <div className="total-bar">
                             {totalAmount ? <>
                                     <div>Total</div>
                                      <div>{totalAmount}</div>
                                                </> :""}
                       </div>
                     <div className="premiumText">
                        <div>Get Premium to add more than 1000</div>
                            <button onClick={()=>{dispatch(activatePremium("dark"))}}>Activate Premium</button>
                        </div>
                        
               </div>
               
           
        </div>
    )
}