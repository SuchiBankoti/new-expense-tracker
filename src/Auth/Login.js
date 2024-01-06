import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { activateToken, authExpenseLogin, setUsername } from "../Store/CreateSlice";
import { useDispatch, useSelector} from "react-redux";



export default function LoginForm() {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.expense)
    const naviagte=useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
  const[err,setErr]=useState('')
    function handleFormData(e) {
       setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
   }
    function authLogin() {
        dispatch(authExpenseLogin(formData))
        dispatch(activateToken())
        if (token) {
            naviagte('/welcome-page')
        } else {
            setErr('Invalid credentials')
        }
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
        <div style={{ visibility: err ? 'visible' : "hidden", color: "red" }}>{err}</div>
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