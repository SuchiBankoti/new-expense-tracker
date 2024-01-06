import { FaDumpster, FaPen } from "react-icons/fa";
import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { activateEdit ,removeExpenseData,} from "../Store/CreateSlice";



export default function MiniExpense({ expense,setFormdata }) {
    const { allExpenses,editmode,editableItemId,username } = useSelector((state) => state.expense)
    const [activeSecondary,setActiveSecondary]=useState(false)
  const dispatch=useDispatch()
    
    function activeEdit(id) {
        dispatch(activateEdit(id))
        const editableItem = allExpenses.find((e) => e.id === id);
        setFormdata(editableItem);
      }
    return (
        <div
            style={{ display: editmode && editableItemId === expense.id ? "none" : "flex" }}
            className="mini-expense"
            onMouseOver={() => setActiveSecondary(true)}
            onMouseOut={()=>setActiveSecondary(false)}
          >
            <div className={`primary-mini-expense ${activeSecondary?"active":""}`} >
                <div className="mini-expense-icon">
                    <img
              src={`${process.env.PUBLIC_URL}/image/${expense.category}.png`}
              alt="icon"
                 className="mini-expense-icon" /></div>
            <p className="mini-expense-icon">{expense.category}</p>
              </div>
     
            <div className={`secondary-mini-expense ${activeSecondary?"active":""}`} >
                <p className="mini-expense-icon">${expense.cost}</p>
                <div>
              <FaDumpster onClick={() => dispatch(removeExpenseData({ id: expense.id, username: username }))} className="icon" />
              <FaPen onClick={() => activeEdit(expense.id)} className="icon" />
                </div>
            </div>
          </div>
    )
}