import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateCompleteProfile,verifyUserEmail,logoutUser,activateToken,getUserProfile, activatePremium } from "./Store/CreateSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
    
    const {profileInfo,token,theme} = useSelector((state)=>state.expense)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token))
        }
        else {
            const localtoken = localStorage.getItem('token')
            dispatch(getUserProfile(localtoken))
            dispatch(activateToken())
        }
    }, [])
    

    return (
        <div className="navbar" style={{backgroundColor:theme==="light"?"skyblue":"grey",display:"flex",gap:"20px",color:theme==="light"?"white":"black"}}>
            <div className="profileSection">
                <div>{profileInfo.name}</div>
                <img src={profileInfo.photoUrl} alt="profilepic" style={{width:"100px", height:"100px"}}/>
            </div>
            <div>
            <button className="verificationBtn" onClick={()=>dispatch(verifyUserEmail(token))}>Verify Email</button>
            </div>
            {
                !(profileInfo.name && profileInfo.photoUrl) ?
                <div>Your profile is Incomplete.<span onClick={() =>dispatch(activateCompleteProfile(true))} style={{color:"blue",cursor:"pointer"}}>Complete Now</span></div>
                :""    
            }
            <div>
                <Link to="/">
                <button onClick={()=>dispatch(logoutUser())}>Logout</button>
                </Link>
            </div>
            <div>
                <button onClick={()=> dispatch(activatePremium("dark"))} style={{ width: "60px", height: "30px", background: theme === "dark" ? "grey" : "black" }}>dark</button>
                <button onClick={()=> dispatch(activatePremium("light"))} style={{ width: "60px", height: "30px", background: theme === "dark" ? "black" : "grey" }}>light</button>
            </div>
        </div>
    )
}