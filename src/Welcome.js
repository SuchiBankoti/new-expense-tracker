import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {activateToken, getAllExpenses, logoutUser} from "./Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const updateProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";
const getProfileApi = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
const getVerified="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
// const confirmVerificationCode="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
export default function WelcomePage() {
  const {token,allExpenses,username,totalAmount} = useSelector((state) => state.expense)
       const dispatch=useDispatch()
    const [profile, setProfile] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "",
        profilePictureUrl:""
    })
    const [formData, setFormData] = useState({
        name: "",
        profilePictureUrl:""
    })
    useEffect(() => {
        async function getPro() {
            const res=await fetch(getProfileApi, {
                method: "POST",
                body: JSON.stringify({
                    idToken: token,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            if (data.users) {
                const profileContent = data.users[0]
                 if (profileContent.displayName) {
                setProfileData(prev=>({...prev,name:profileContent.displayName}))
            }
            if (profileContent.photoUrl) {
                setProfileData(prev=>({...prev,profilePictureUrl:profileContent.photoUrl}))
            }
            }
        }
        if (token) {
            getPro()
        }
            
    },[token])
   
    function handleChange(e) {
        setFormData(perv=>({...perv,[e.target.name]:e.target.value}))
    }
    


    function verifyEmail() {
        fetch(getVerified, {
            method: "POST",
            body: JSON.stringify({
                requestType:"VERIFY_EMAIL",
                idToken: token
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if (res.ok) {
                    alert("Email Verified");
                }
           else {
                alert("Email Verification Failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        }

    async function updateProfile() {
        const res=await fetch(updateProfileApi, {
            method: "POST",
            body: JSON.stringify({
                idToken:token,
                displayName: formData.name,
                photoUrl: formData.profilePictureUrl,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        alert("Profile Successfully updated");
    }
    useEffect(() => {
        dispatch(getAllExpenses(username))
    },[])
    return (
        <div>
            <div>
                <Link to="/">
                <button onClick={()=>dispatch(logoutUser())}>Logout</button>
                </Link>
            </div>
            <div style={{display:"flex"}}>
                <h1>Welcome To expense tracker<span>{username}</span></h1>
                <button className="verificationBtn" onClick={verifyEmail}>Verify Email</button>
            <div>Your profile is Incomplete.<span onClick={() => setProfile(true)} style={{color:"blue",cursor:"pointer"}}>Complete Now</span></div>
            </div>
            {
                profile? <div className="Profile">
                <form>
                    <label>Full name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange}/>
                    <label>Profile Photo url</label>
                    <input name="profilePictureUrl" type="url" value={formData.profilePictureUrl} onChange={handleChange}/>
                    </form>
                    <button onClick={updateProfile}>Update</button>
            </div>:""
            }
            <div>
                <Link to="/add-expense">
                <button>Manage Expense</button>
                </Link>
            </div>
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
              <tr key={nanoid()}>
                <td>{expense.category}</td>
                <td>{expense.detail}</td>
                <td>{expense.cost}</td>
              </tr>
            ))}
          </tbody>
                </table>
                {
                    totalAmount >= 1000 ?
                        <h1>get<button>Premium</button>to add more than 1000</h1>
                        :
                        <div>total:{totalAmount}</div>
                        
                }
      </div>
            
           
        </div>
    )
}