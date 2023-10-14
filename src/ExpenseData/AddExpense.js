import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllExpenses, getExpenseData } from "../Store/CreateSlice";

const api = "https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/";

export default function AddExpense() {
  const { allExpenses } = useSelector((state) => state.expense)
  const dispatch=useDispatch()
  console.log("all",allExpenses)
  const [formdata, setFormdata] = useState({
    cost: "",
    detail: "",
    category: ""
  });
  const [tabledata, setTabledata] = useState([]);
  const [trackdata, setTrackdata] = useState(0);
  const [editmode, setEditmode] = useState(false);
  const [editableItemId, setEditableItemId] = useState(null); // Track the ID of the item being edited

  useEffect(() => {
    async function getAllProductsData() {
      const allproductResponse = await fetch(`${api}/data/allExpenses.json`);
      const result = await allproductResponse.json();
      const a = Object.entries(result);
      const allExpenseData = a.map((e) => {
        return { ...e[1], id: e[0] };
      });
      setTabledata(allExpenseData);
    }
    getAllProductsData();
  }, [trackdata]);

  function handleChange(e) {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function sendData() {
    fetch(`${api}/data/allExpenses.json`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formdata)
    }).then((res) => {
      if (res.ok) {
        setTrackdata((prev) => prev + 1);
        setFormdata({ cost: "", detail: "", category: "" }); // Clear the form after adding
      }
    }).catch(e => console.log(e));
  }

  function removeExpense(id) {
    fetch(`${api}/data/allExpenses/${id}.json`, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        alert("Successfully deleted");
        setTrackdata((prev) => prev - 1);
      }
    });
  }

  function editExpense(id) {
    fetch(`${api}/data/allExpenses/${id}.json`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        cost: formdata.cost,
        detail: formdata.detail,
        category: formdata.category
      })
    }).then((res) => {
      if (res.ok) {
        alert("Successfully updated");
        setEditmode(false);
        setTrackdata((prev) => prev - 1);
        setEditableItemId(null); // Clear the editable item ID
      } else {
        alert("Update failed");
      }
    }).catch(e => console.log(e));
  }

  function activeEdit(id) {
    setEditmode(true);
    setEditableItemId(id); // Set the ID of the item being edited
    const editableItem = tabledata.find((e) => e.id === id);
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
        <button onClick={sendData} style={{ margin: "20px" }}>
          Add data
        </button>
      ) : (
        <button onClick={() => editExpense(editableItemId)} style={{ margin: "20px" }}>
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
            {tabledata.map((expense) => (
              <tr key={nanoid()} style={{ display: editmode && editableItemId === expense.id ? "none" : "tableRow" }}>
                <td>{expense.category}</td>
                <td>{expense.detail}</td>
                <td>{expense.cost}</td>
                <td>
                  <button onClick={() => removeExpense(expense.id)}>Remove</button>
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
