import { nanoid } from "@ant-design/pro-components";
import React, { useState } from "react";

export default function AddExpense() {
    const [formdata, setFormdata] = useState({
        cost: "",
        detail: "",
        category:""
    })
    const[tabledata,setTabledata]=useState([])
    function handleChange(e) {
        setFormdata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    function pdata() {
        console.log(formdata)
        setTabledata(prev=>[...prev,formdata])
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
            <button onClick={pdata} style={{margin:"20px"}}>Add data</button>
            <div>
            <table border="1">
    <tr>
        <th>Category</th>
        <th>Details</th>
        <th>Cost</th>
    </tr>
                    
                    {
                        tabledata.map(expense => {
                            return <tr key={nanoid()}>
                         <td>{expense.category}</td>
                                <td>{expense.detail}</td>
                         <td>{expense.cost}</td>
                            </tr>
                        })
          }

   
</table>
            </div>
        </div>
    )
}