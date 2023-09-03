import React, {useState } from "react";

const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";
export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const[err,setErr]=useState("")
    function validatePassword() {
        setFormData(prev => {
            return {
                ...prev,
                confirmPassword: "",
                
              }
        })
        setErr("Password do not match. Try again")
      }  
      function authNewUSer() {
        fetch(signupApi, {
            method: "POST",
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(data => {
                    localStorage.setItem("token", data.idToken);
                    alert("Account Successfully created");
                });
            } else {
                alert("Authentication Failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
    











    function handleFormData(e) {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
    return (<div className="authSubPage">
        <div>
            <h2 className="authPageTitle">SignUp</h2>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormData}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormData}
                ></input>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormData}
                ></input>
                {err ? <p style={{color:"red"}}>{err}</p>:""}
            </form>
        </div>
        <button className="authPageBtn" onClick={() => {
            if (formData.password === formData.confirmPassword) {
                // setFormData(prev =>({...prev,errMsg:""}))
                authNewUSer()
            } else {
                validatePassword()
            }
        }
        }>Sign Up</button>
        
    </div>)
}