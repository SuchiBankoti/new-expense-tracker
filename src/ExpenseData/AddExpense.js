import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllExpenses, activateEdit ,addExpenseData,removeExpenseData,updateExpenseData,getTotalAmount, setUsername} from "../Store/CreateSlice";


export default function AddExpense() {
  const { allExpenses,trackdata,editmode,editableItemId,username,totalAmount } = useSelector((state) => state.expense)
  console.log("username", username)
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


  
 
  
  function handleChange(e) {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function activeEdit(id) {
    dispatch(activateEdit(id))
    const editableItem = allExpenses.find((e) => e.id === id);
    setFormdata(editableItem);
  }

  return (
    <div>
      <h2>{username}</h2>
      <h1>Add Expense</h1>
      {totalAmount >=1000 ?
        <>
          <h1>get<button>Premium</button>to add more than 1000</h1>
        </> :
          <>
      
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
            <select value={formdata.category} name="category" onChange={handleChange}>
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
            } style={{ margin: "20px" }}>
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
              } style={{ margin: "20px" }}>
              Update data
            </button>
          )}
                   </> 
      }
    
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
              <tr key={nanoid()} style={{ display: editmode && editableItemId === expense.id ? "none" : "tableRow" }}>
                <td>{expense.category}</td>
                <td>{expense.detail}</td>
                <td>{expense.cost}</td>
                <td>
                  <button onClick={() => dispatch(removeExpenseData({ id: expense.id,username:username}))}>Remove</button>
                </td>
                {!editmode && (
                  <td>
                    <button onClick={() => activeEdit(expense.id)}>Edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div>total:{totalAmount}</div>
        <button onClick={()=>dispatch(getAllExpenses(username))}>check</button>
      </div>
    </div>
  );
}
