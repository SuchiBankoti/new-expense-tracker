import React, { useState } from "react";
import SignUpForm from "./SignUp";
import LoginForm from "./Login";

export default function AuthPage() {
    const[isLogin,setIsLogin]=useState(false)
    return (<div className="AuthPage"> 
        {!isLogin?
     <SignUpForm />:
        <LoginForm />
        }
        <button className="authPageMainBtn"
            onClick={() => { setIsLogin(prev=>!prev) }}>
            {isLogin?"Don't Have an account? SignUp":"Have an account? Login"}
        </button>
    </div>)
}