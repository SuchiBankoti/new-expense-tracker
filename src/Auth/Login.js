import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { activateToken, authExpenseLogin } from "../Store/CreateSlice";
import { useDispatch } from "react-redux";




export default function LoginForm() {
  const dispatch = useDispatch()
  
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [isFormValid, setIsFormValid] = useState(false);

    function handleFormData(e) {
       setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
   }
   function authLogin() {
    dispatch(authExpenseLogin(formData))
    dispatch(activateToken())
  }

    useEffect(() => {
        setIsFormValid(formData.email && formData.password);
      }, [formData.email, formData.password]);
  
  
    return (<div className="authSubPage">
        <div>
            <h2 className="authPageTitle">Login</h2>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                ></input>
                <input type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                ></input>
        </form>
        <Link to="/reset-password">
            <p style={{color:"blue"}}>Forgot Password?</p>
        </Link>
        </div>
        <Link to="/welcome-page"><button className="authPageBtn" onClick={() => {
            authLogin()
      }}
      disabled={!isFormValid}
      >Login</button>
            </Link>
        
    </div>)
}