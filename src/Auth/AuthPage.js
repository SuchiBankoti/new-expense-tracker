import React, { useState } from "react";
import SignUpForm from "./SignUp";
import LoginForm from "./Login";
import "../CSS/Auth.css"



export default function AuthPage() {
    const[isLogin,setIsLogin]=useState(false)
    return (<div className="auth-page">
        
        {!isLogin ? <SignUpForm /> : <LoginForm />}
        
        <button className="auth-page-btn common-auth-btn" onClick={() => { setIsLogin(prev=>!prev) }}>
            {isLogin?"Don't Have an account? SignUp":"Have an account? Login"}
        </button>
    </div>)
}