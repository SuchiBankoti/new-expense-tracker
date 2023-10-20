import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateCompleteProfile,verifyUserEmail,logoutUser,activateToken,getUserProfile, activatePremium, switchTheme } from "./Store/CreateSlice";
import { Link } from "react-router-dom";
import "./Navbar.css"
import { useState } from "react";
import { FaDumpster,FaPen } from "react-icons/fa";
import EditProfile from "./EditProfile";
import {BsFillPatchCheckFill} from "react-icons/bs"

export default function Navbar() {
    const[activeSidebar,setActiveSidebar]=useState(false)
    const {profileInfo,token,theme,username,completeProfile,premium} = useSelector((state)=>state.expense)
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getUserProfile(token))
    }, [token])
    

    return (
        <div
            className="navbar"
            style={{
                backgroundColor: theme === "light" ? "white" : "black",
                display: "flex", gap: "20px", color: theme === "light" ? "white" : "black",
                 borderBottom:theme==="light"?"1px solid black":"1px solid white"                
            }}>
            <div className="profileSection">
                <img
                    src={profileInfo.photoUrl || process.env.PUBLIC_URL + '/image/pp.png'}
                    alt="profilepic"
                    className="profilePic"
                    onClick={() => setActiveSidebar(true)} />
            </div>
            
             
            <div
                className={`sidebar ${activeSidebar ? "active" : ""}`}
                style={{background:theme==="dark"?"black":"white"}}
            >
                <div className="profileSection">
                    <div>
                        <img
                            src={profileInfo.photoUrl || process.env.PUBLIC_URL + '/image/pp.png'}
                            alt="profilepic"
                            className="profilePic"
                            onClick={() => setActiveSidebar(false)} />
                        
                    </div>
                    <div style={{ color: theme === "dark" ? "white" : "black" }}>
                        {profileInfo.name}{profileInfo.emailVerified ?
                            <BsFillPatchCheckFill /> : ""}</div>
                     <div style={{color:theme==="dark"?"white":"black"}}>{username}@gmail.com</div>
                 </div>
                 <div className="sidebarContentSection">
                     <div>Premium</div>
                     <div>
                                 <button
                                     onClick={() => dispatch(activateCompleteProfile(true))}
                                    >
                                     Edit Profile</button>
                                 
                     </div>
                     
                     <div>
                        {!profileInfo.emailVerified?
                            <button className="verificationBtn" onClick={() => dispatch(verifyUserEmail(token))}>Verify Email</button>:""}
                     </div>
                     <div>
                             <Link to="/">
                              <button onClick={()=>dispatch(logoutUser())} className="logoutBtn">Logout</button>
                              </Link>
                     </div>
                 </div>
             </div>
            
            <div
                className={`editProfileBar ${completeProfile ? "active" : ""}`}
                style={{background:theme==="light"?"white":"black"}}
            >
                <EditProfile/>
            </div>
           
            {
                premium ? 
                <div className="toggleThemeBtn">
                <div
                 className={`toggleSwitch ${theme === "dark" ? "active" : ""}`}
               onClick={() =>
               dispatch(switchTheme(theme === "dark" ? "light" : "dark"))
                  }
                     >
                <div className="toggleBall"></div>
                  </div>
            </div>
                 : ""
            }
           

        </div>
    )
}