import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllExpenses, activateEdit ,addExpenseData,removeExpenseData,updateExpenseData,getTotalAmount, setUsername} from "../Store/CreateSlice";
import Navbar from "../Navbar";
import { FaDumpster, FaPen } from "react-icons/fa";
import "../Welcome.css"

export default function AddExpense() {
  const { allExpenses,trackdata,editmode,editableItemId,username,totalAmount,theme,premium } = useSelector((state) => state.expense)
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

  function activeEdit(id) {
    dispatch(activateEdit(id))
    const editableItem = allExpenses.find((e) => e.id === id);
    setFormdata(editableItem);
  }

  return (
    <div className="addExpensePage"
      style={{
        color: theme === "light" ? "black" : "white",
        background: theme === "light" ? "white" : "black"
      }}>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <div className={theme === 'dark' ? "table-heading-active" : "table-heading"} style={{paddingLeft:"15px"}}>Add Expense</div>
          <form className="form-expense">
            <label>Cost</label>
            <input
              value={formdata.cost}
              type="number"
              name="cost"
              onChange={handleChange}
            />
            <label>Detail</label>
            <input
              value={formdata.detail}
              type="text"
              name="detail"
              onChange={handleChange}
            />
            <label>Category</label>
            <select value={formdata.category} name="category" onChange={handleChange} style={{color:theme==="light"?"black":"white"}}>
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
              if ((Number(formdata.cost) + totalAmount) > 1000) {
                alert("go premium to add more")
              } else {
                dispatch(addExpenseData({ formdata: formdata, username: username }))
              }
            }
            } style={{ margin: "20px" }}
          disabled={(totalAmount>1000 || Number(formdata.cost)>1000)}
        >
              Add data
            </button>
          ) : (
              <button onClick={() => {
                if ((Number(formdata.cost) + totalAmount) > 1000) {
                  alert("go premium to add more")
                } else {
                  dispatch(updateExpenseData({
                    id: editableItemId,
                    formdata: formdata,
                    username: username
                  }))
                }
              }
              } style={{ margin: "20px" }}
             disabled={(totalAmount>1000 || Number(formdata.cost)>1000)}
                   
          >
              Update data
            </button>
          )}
               </div>         
    
            <div className={theme==='dark'?"table-active":"table"}>
        <table border="1" className={theme==='dark' ? "main-table-active":"main-table"}>
        <thead className={theme==='dark' ?"table-heading-active":"table-heading"}>
             <p>Expense List</p>
            </thead>
          <tbody>
            {allExpenses.map((expense) => (
              <tr key={nanoid()} style={{ display: editmode && editableItemId === expense.id ? "none" : "tableRow" }} className={premium?"table-row-active":"table-row"}>
                <td className={theme==='dark'? "table-text-active":"table-text"}>{expense.category}</td>
                <td className={theme==='dark'? "table-text-active":"table-text"}>{expense.detail}</td>
                <td className={theme==='dark' ? "table-text-active":"table-text"}>{expense.cost}</td>
                <td className={theme==='dark'? "table-text-active":"table-text"}>
                  <FaDumpster onClick={() => dispatch(removeExpenseData({ id: expense.id,username:username}))} className="icon"/>
                </td>
                {!editmode && (
                  <td className={theme==='dark'? "table-text-active":"table-text"}>
                    <FaPen onClick={() => activeEdit(expense.id)} className="icon"/>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-bar">
                             {totalAmount ? <>
                                     <div>Total</div>
                                      <div>{totalAmount}</div>
                                                </> :""}
                       </div>
               </div>
      </div>
        
    </div>
  );
}
