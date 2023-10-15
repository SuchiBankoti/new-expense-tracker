import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllExpenses, activateEdit ,addExpenseData,removeExpenseData,updateExpenseData} from "../Store/CreateSlice";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";

export default function AddExpense() {
  const { allExpenses,trackdata,editmode,editableItemId } = useSelector((state) => state.expense)
  const dispatch=useDispatch()
  const [formdata, setFormdata] = useState({
    cost: "",
    detail: "",
    category: ""
  });

  useEffect(() => {
    dispatch(getAllExpenses())
    if (!editmode) {
      setFormdata({ cost: "", detail: "", category: "" });
    }
  }, [trackdata]);

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
      <h1>Add Expense</h1>
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
        <button onClick={()=> dispatch(addExpenseData(formdata))} style={{ margin: "20px" }}>
          Add data
        </button>
      ) : (
        <button onClick={() => dispatch(updateExpenseData({
          id: editableItemId,
          formdata:formdata
        }))} style={{ margin: "20px" }}>
          Update data
        </button>
      )}

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
                  <button onClick={() =>  dispatch(removeExpenseData(expense.id))}>Remove</button>
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
        <button onClick={()=>dispatch(getAllExpenses())}>check</button>
      </div>
    </div>
  );
}
