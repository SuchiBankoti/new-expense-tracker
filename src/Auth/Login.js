import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { activateToken, authExpenseLogin, setUsername } from "../Store/CreateSlice";
import { useDispatch, useSelector} from "react-redux";



export default function LoginForm() {
    const dispatch = useDispatch()
    const naviagte=useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [err, setErr] = useState('')
    const[isLoging,setIsLogingIn]=useState(false)
    function handleFormData(e) {
       setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
   }
    function authLogin() {
        console.log('logginin')
        dispatch(authExpenseLogin(formData))
        dispatch(activateToken())
        setIsLogingIn(true)
        setTimeout(() => {
            if (localStorage.getItem('token')) {
                naviagte('/welcome-page')
            } else {
                setErr('Invalid credentials')
                setIsLogingIn(false)
            }
        }, 2000);
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
        <div style={{ visibility: isLoging ? 'visible' : "hidden", color: "black" }}>Loging In...</div>
        <div style={{ visibility: err && !isLoging ? 'visible' : "hidden", color: "red" }}>{err}</div>
        <Link to="/reset-password">
            <p style={{color:"blue"}}>Forgot Password?</p>
        </Link>
          
        <button className="auth-page-btn login" onClick={() => {
            sendUsername()
                authLogin()
          }}
          >Login</button>
       
       
        
    </>)
}