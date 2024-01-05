import React, { useEffect, useState } from "react";
import {activateCompleteProfile, getAllExpenses,setUsername, updateUserProfile,getUserProfile} from "../Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import "../CSS/EditProfile.css"

export default function EditProfile() {
  const {token,username,profileInfo,theme} = useSelector((state) => state.expense)
       const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        name: profileInfo.name,
        photoUrl:profileInfo.photoUrl
    })
    
    useEffect(() => {
            dispatch(getUserProfile(token))
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
        
        <div className="profile">
            <div>
            <FaArrowLeft className="icon" onClick={()=>dispatch(activateCompleteProfile(false))}/>
            </div>
                <form className="auth-form">
                    <label className="editProfileLabel" >Name
                    </label>
                    <input className="auth-input" name="name" type="text" value={formData.name} onChange={handleChange} />
                <label className="editProfileLabel">Profile Photo url
                </label>
                    <input className="auth-input" name="photoUrl" type="url" value={formData.photoUrl} onChange={handleChange} />
            </form>
            <br></br>
            <button
                className="auth-page-btn"
                onClick={() => {
                        dispatch(updateUserProfile({ token: token, formData: formData }))
                        dispatch(activateCompleteProfile(false))
                    }
                    }>Update</button>
            </div>
            
          
      
        
    )
}