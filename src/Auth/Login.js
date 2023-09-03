import React, { useState } from "react";
import { Link } from "react-router-dom";

const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function handleFormData(e) {
       setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
   }
    function authLogin() {
          fetch(loginApi, {
            method: "POST",
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                localStorage.setItem("token",data.idToken);
              });
              alert(
                "Succesfully logged in"
              );
            } else {
              return res.json().then((data) => {
                let errMsg = "Login Failed";
                if (data && data.error && data.error.message) {
                  errMsg = data.error.message;
                }
                alert(errMsg);
              });
            }
          });
      }


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
            <p style={{color:"blue"}}>Forgot Password?</p>
        </div>
        <Link to="/welcome-page"><button className="authPageBtn" onClick={() => {
            authLogin()
        }}>Login</button>
            </Link>
        
    </div>)
}