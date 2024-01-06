import React, { useEffect, useState } from "react";
import SignUpForm from "./SignUp";
import LoginForm from "./Login";
import "../CSS/Auth.css"
import { useDispatch } from "react-redux";
import { logoutUser } from "../Store/CreateSlice";



export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false)
    const dispatch=useDispatch()
    useEffect(() => {
        if (localStorage.getItem('token')) {
           dispatch(logoutUser())
        }
    },[])
    
    return (<div className="auth-page">
        
        {!isLogin ? <SignUpForm /> : <LoginForm />}
        
        <button className="auth-page-btn common-auth-btn" onClick={() => { setIsLogin(prev=>!prev) }}>
            {isLogin?"Don't Have an account? SignUp":"Have an account? Login"}
        </button>
    </div>)
}