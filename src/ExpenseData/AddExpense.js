import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllExpenses,addExpenseData,updateExpenseData, setUsername} from "../Store/CreateSlice";
import Navbar from "../Comps/Navbar";
import "../CSS/AddExpense.css"
import MiniExpense from "./MiniExpense";

export default function AddExpense() {
  const { allExpenses,trackdata,editmode,editableItemId,username} = useSelector((state) => state.expense)
  const dispatch=useDispatch()
  const [formdata, setFormdata] = useState({
    cost: "",
    detail: "",
    category: ""
  });
  useEffect(() => {
    dispatch(setUsername())
  }, [])
  

  useEffect(() => {
    dispatch(getAllExpenses(username))
    if (!editmode) {
      setFormdata({ cost: "", detail: "", category: "" });
    }
  }, [trackdata,username]);

  
  


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
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  

  return (
    <div className="welcome-page">
      <Navbar />
      <div className="container">
          <form className="auth-form">
            <label className="label">Cost</label>
            <input
              className="auth-input"
              value={formdata.cost}
              type="number"
              name="cost"
            onChange={handleChange}
            required
            />
            <label className="label">Detail</label>
            <input
               className="auth-input"
              value={formdata.detail}
              type="text"
              name="detail"
            onChange={handleChange}
            required
            />
            <label className="label">Category</label>
            <select value={formdata.category} name="category" onChange={handleChange}   className="auth-input" required>
            <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Clothes">Clothes</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Shoes">Shoes</option>
              <option value="Other">Other</option>
            </select>
          </form>
          {!editmode ? (
          <button onClick={() => {
            if (formdata.cost && formdata.category && formdata.detail) {
              dispatch(addExpenseData({ formdata: formdata, username: username }))
            }
          }} className="auth-page-btn">
              Add data
            </button>
          ) : (
              <button onClick={() =>dispatch(updateExpenseData({
                    id: editableItemId,
                    formdata: formdata,
                username: username
              }))} className="auth-page-btn" >
              Update data
            </button>
          )}
    
           
      </div>
      <div className="all-expense">
        {allExpenses.map((expense) => <MiniExpense expense={expense} setFormdata={setFormdata} key={expense.id}/>)}
        </div>
       </div>
  );
}
