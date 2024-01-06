import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateCompleteProfile,logoutUser,getUserProfile } from "../Store/CreateSlice";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css"
import { useState } from "react";
import EditProfile from "./EditProfile";

export default function Navbar() {
    const[activeSidebar,setActiveSidebar]=useState(false)
    const {profileInfo,token,username,completeProfile} = useSelector((state)=>state.expense)
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getUserProfile(token))
    }, [token])
    

    return (
        <div className="navbar">
            <div className="profileSection">
                <img
                    src={profileInfo.photoUrl || process.env.PUBLIC_URL + '/image/pp.png'}
                    alt="profilepic"
                    className="profilePic"
                    onClick={() => setActiveSidebar(true)} />
            </div>
            
             <div  className={`overlay ${activeSidebar ? "active" : ""}`}  onClick={() => setActiveSidebar(false)}></div>
            <div
                className={`sidebar ${activeSidebar ? "active" : ""}`}>
                <div className="profileSection">
                    <div>
                        <img
                            src={profileInfo.photoUrl || process.env.PUBLIC_URL + '/image/pp.png'}
                            alt="profilepic"
                            className="profilePic"
                            />
                        
                    </div>
                    <div>
                        {profileInfo.name}</div>
                     <div>{username}@gmail.com</div>
                 </div>
                 <div className="sidebarContentSection">
                     <div>
                        <button
                            className="auth-page-btn"
                                     onClick={() => dispatch(activateCompleteProfile(true))}
                                    >
                                     Edit Profile</button>
                                 
                     </div>
                     
                     <div>
                             <Link to="/">
                              <button onClick={()=>dispatch(logoutUser())}   className="auth-page-btn">Logout</button>
                              </Link>
                     </div>
                 </div>
             </div>
            <div
                className={`editProfileBar ${completeProfile ? "active" : ""}`}
                
            >
                <EditProfile/>
            </div>
           
            <div>
                <Link to="/add-expense" className="link">
                Manage Expenses
                </Link>
           </div>

        </div>
    )
}