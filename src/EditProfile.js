import React, { useEffect, useState } from "react";
import {activateCompleteProfile, getAllExpenses,setUsername, updateUserProfile} from "./Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import "./EditProfile.css"
export default function EditProfile() {
  const {token,username,profileInfo,theme} = useSelector((state) => state.expense)
       const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        name: profileInfo.name,
        photoUrl:profileInfo.photoUrl
    })
    
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
        setFormData(perv=>({...perv,[e.target.name]:e.target.value}))
    }



    return (
        
        <div className="profile" style={{ background: theme === "light" ? "white" : "black" }}>
            <div>
            <FaArrowLeft style={{color:theme==="light"?"black":"white"}} className="icon" onClick={()=>dispatch(activateCompleteProfile(false))}/>
            </div>
                <form>
                    <label className="editProfileLabel" style={{color:theme==="light"?"black":"white"}}>Name
                    </label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} style={{color:theme==="light"?"black":"white"}}/>
                <label className="editProfileLabel" style={{color:theme==="light"?"black":"white"}}>Profile Photo url
                </label>
                    <input name="photoUrl" type="url" value={formData.photoUrl} onChange={handleChange} style={{color:theme==="light"?"black":"white"}}/>
            </form>
            <br></br>
                    <button onClick={() => {
                        dispatch(updateUserProfile({ token: token, formData: formData }))
                        dispatch(activateCompleteProfile(false))
                    }
                    }>Update</button>
            </div>
            
          
      
        
    )
}