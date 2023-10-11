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
    const[trackdata,setTrackdata]=useState(0)
    useEffect(() => {
        async function getAllProductsData() {
            const allproductResponse = await fetch(
              `${api}/data/allExpenses.json`
            );
            const result = await allproductResponse.json();
            const a = Object.entries(result);
            const allExpenseData = a.map((e) => {
                return e[1];
            });
            setTabledata(allExpenseData)
        }
        getAllProductsData()
    }, [trackdata])
    

    function handleChange(e) {
        setFormdata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    function pdata() {
        sendData()
    }
    function sendData() {
        fetch(`${api}/data/allExpenses.json`, {
            method: "POST",
            headers: {
                "Content-type":"application/json"
                
            },
            body: JSON.stringify(formdata)
        }).then(res => {
            if (res.ok) {
                setTrackdata(prev=>prev+1)
            }
        }).catch(e=>console.log(e))
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
                            </tr>
                        })
          }
 </tbody>
   
</table>
            </div>
        </div>
    )
}