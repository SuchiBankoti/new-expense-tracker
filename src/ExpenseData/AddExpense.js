import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getAllExpenses, activateEdit ,addExpenseData,removeExpenseData,updateExpenseData,getTotalAmount, setUsername} from "../Store/CreateSlice";
import Navbar from "../Navbar";
import { FaDumpster,FaPen } from "react-icons/fa";

export default function AddExpense() {
  const { allExpenses,trackdata,editmode,editableItemId,username,totalAmount,theme } = useSelector((state) => state.expense)
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
      <Navbar/>
          <form>
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
              <tr key={nanoid()} style={{ display: editmode && editableItemId === expense.id ? "none" : "tableRow" }}>
                <td>{expense.category}</td>
                <td>{expense.detail}</td>
                <td>{expense.cost}</td>
                <td>
                  <FaDumpster onClick={() => dispatch(removeExpenseData({ id: expense.id,username:username}))} className="icon"/>
                </td>
                {!editmode && (
                  <td>
                    <FaPen onClick={() => activeEdit(expense.id)} className="icon"/>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div>total:{totalAmount}</div>
         
      </div>
    </div>
  );
}
