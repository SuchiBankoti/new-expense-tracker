import React, { useState} from "react";
import { Link } from "react-router-dom";
import { activateToken, authExpenseLogin, setUsername } from "../Store/CreateSlice";
import { useDispatch} from "react-redux";



export default function LoginForm() {
  const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function handleFormData(e) {
       setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
   }
    function authLogin() {
        dispatch(authExpenseLogin(formData))
        dispatch(activateToken())
  }
    function sendUsername() {
        const name = formData.email.match(/^(.+)@/)[1];
        localStorage.setItem("expenseUsername",name)
             dispatch(setUsername())
}
   
  
    
    return (<>
            <h2 className="title">Login</h2>
            <form className="auth-form">
                <input
                     className="auth-input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                    required
                ></input>
                <input
                     className="auth-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                    required
                ></input>
        </form>
        <Link to="/reset-password">
            <p style={{color:"blue"}}>Forgot Password?</p>
        </Link>

        <Link to="/welcome-page"><button className="auth-page-btn login" onClick={() => {
            sendUsername()
                authLogin()
          }}
          >Login</button>
            </Link>
       
       
        
    </>)
}