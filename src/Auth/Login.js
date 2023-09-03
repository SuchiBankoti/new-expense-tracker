import React, { useState } from "react";

const loginApi ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";
export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    return (<div className="authSubPage">
        <div>
            <h2 className="authPageTitle">Login</h2>
            <form>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            </form>
        </div>
        <button className="authPageBtn">Login</button>
        
    </div>)
}