import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {activateCompleteProfile, activatePremium, activateToken, getAllExpenses, getUserProfile, logoutUser, setUsername, updateUserProfile, verifyUserEmail, } from "./Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Navbar from "./Navbar";
import DownloadButton from "./ExpenseData/Download";

export default function WelcomePage() {
  const {token,allExpenses,username,totalAmount,profileInfo,completeProfile,theme} = useSelector((state) => state.expense)
       const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        name: profileInfo.name,
        photoUrl:profileInfo.photoUrl
    })
    
    
    useEffect(() => {
        if (username) {
            dispatch(getAllExpenses(username))
        } else {
            const localname = localStorage.getItem("expenseUsername")
            dispatch(getAllExpenses(localname))
            dispatch(setUsername())
        }
    }, [])
    
    function handleChange(e) {
        setFormData(perv=>({...perv,[e.target.name]:e.target.value}))
    }



    return (
        <div className="welcomePage" style={{
            color: theme === "light" ? "black" : "white",
            background: theme === "light" ? "white" : "black"
        }}>
            
            <Navbar/>
            <div style={{display:"flex"}}>
                <h1>Welcome To expense tracker<span>{username}</span></h1>
            </div>
            {
                completeProfile? <div className="Profile">
                <form>
                    <label>Full name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange}/>
                    <label>Profile Photo url</label>
                    <input name="photoUrl" type="url" value={formData.photoUrl} onChange={handleChange}/>
                    </form>
                    <button onClick={() => {
                        dispatch(updateUserProfile({ token: token, formData: formData }))
                        dispatch(activateCompleteProfile(false))
                    }
                    }>Update</button>
            </div>:""
            }
            <div>
                <Link to="/add-expense">
                <button>Manage Expense</button>
                </Link>
            </div>
            <div>
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
                {
                    totalAmount >= 1000 ?
                        <>
                        <h1>get Premium to add more than 1000</h1>
                            <button onClick={()=>{dispatch(activatePremium("dark"))}}>Activate Premium</button>
                        </>
                        :
                        <div>total:{totalAmount}</div>
                        
                }
      </div>
            <div>
                <DownloadButton/>
            </div>
           
        </div>
    )
}