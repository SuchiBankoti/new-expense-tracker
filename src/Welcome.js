import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { activatePremium, getAllExpenses,   setUsername} from "./Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Navbar from "./Navbar";
import DownloadButton from "./ExpenseData/Download";
import { FaPen} from 'react-icons/fa';

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
    
   


    return (
        <div className="welcomePage" style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            
            <Navbar/>
            <div style={{display:"flex",alignItems:"center",padding:"10px 15px",gap:"10px"}}>
                <Link to="/add-expense">
                <FaPen className="icon" style={{color:theme==="light"?"black":"white"}}/>
                </Link>
                <h2>Day to day expenses</h2>
                <DownloadButton/>
            </div>
            <div className="table">
        <table border="1">
          <thead>
            <tr>
              <th>Category</th>
              <th>Details</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map((expense) => (
              <tr key={nanoid()}>
                <td>{expense.category}</td>
                <td>{expense.detail}</td>
                <td>{expense.cost}</td>
              </tr>
            ))}
          </tbody>
                </table>
                        <button style={{margin:"15px 0px"}}>total:{totalAmount}</button>
                        <div className="premiumText">
                        <div>get Premium to add more than 1000</div>
                            <button onClick={()=>{dispatch(activatePremium("dark"))}}>Activate Premium</button>
                        </div>
                        
      </div>
               
           
        </div>
    )
}