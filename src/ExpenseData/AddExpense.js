import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";
import { useEffect } from "react";
const api="https://expense-tracker-25d4f-default-rtdb.asia-southeast1.firebasedatabase.app/"
export default function AddExpense() {
    const [formdata, setFormdata] = useState({
        cost: "",
        detail: "",
        category:""
    })
    const [tabledata, setTabledata] = useState([])
    const [trackdata, setTrackdata] = useState(0)
    const [editmode, setEditmode] = useState(false)
    useEffect(() => {
        async function getAllProductsData() {
            const allproductResponse = await fetch(
              `${api}/data/allExpenses.json`
            );
            const result = await allproductResponse.json();
            const a = Object.entries(result);
            const allExpenseData = a.map((e) => {
                return {...e[1],id:e[0]};
            });
            setTabledata(allExpenseData)
        }
        getAllProductsData()
    }, [trackdata])
    console.log("taledata",tabledata)

    function handleChange(e) {
        setFormdata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
   
    function sendData() {
            fetch(`${api}/data/allExpenses.json`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                
                },
                body: JSON.stringify(formdata)
            }).then(res => {
                if (res.ok) {
                    setTrackdata(prev => prev + 1)
                }
            }).catch(e => console.log(e))
    }
    function removeExpense(id) {
        fetch(`${api}/data/allExpenses/${id}.json`, {
            method:"DELETE"
        }).then(res => {
            if (res.ok) {
                alert("successfully deleted")
                setTrackdata(prev=>prev-1)
            }
        })
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
                category:formdata.category
            })
        }).then(res => {
            if (res.ok) {
                alert("successfully updated")
                setEditmode(false)
                setTrackdata(prev => prev - 1)
                
            } else {
                alert("update failed")
            }
        }).catch(e=>console.log(e))
    }
    function activeEdit(id) {
        setEditmode(true)
        const editableItem = tabledata.find(e => e.id === id)
        console.log(editableItem)
        setFormdata(editableItem)
    }
    return (
        <div>
            <h1>Add Expense</h1>

            <form>
                <label>
                    cost
                </label>
                <input
                    value={formdata.cost}
                    type="number"
                    name="cost"
                    onChange={handleChange}
                />
                <label>
                    Detail
                </label>
                <input
                    value={formdata.detail}
                    type="text"
                    name="detail"
                    onChange={handleChange}
                />
                <label>
                    category
                </label>
                <select value={formdata.category} name="category" onChange={handleChange} >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Other">Other</option>
                </select>
               
            </form>
            {!editmode ? <button onClick={sendData} style={{ margin: "20px" }}>Add data</button> :
                <button onClick={()=>editExpense(formdata.id)} style={{ margin: "20px" }}>Update data</button>}
            
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

                   
                    
                    {
                        tabledata.map(expense => {
                            return <tr key={nanoid()}>
                         <td>{expense.category}</td>
                                <td>{expense.detail}</td>
                                <td>{expense.cost}</td>
                                <td>
                                <button onClick={()=>removeExpense(expense.id)}>Remove</button>
                                </td>
                                {!editmode?<td>
                                    <button onClick={() =>activeEdit(expense.id)}>Edit</button>
                                </td>:""}
                            </tr>
                        })
          }
 </tbody>
   
</table>
            </div>
        </div>
    )
}