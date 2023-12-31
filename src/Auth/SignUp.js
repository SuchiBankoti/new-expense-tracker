import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { activateToken, authExpenseSignUp, setUsername } from "../Store/CreateSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");

  useEffect(() => {
    showErr();
  }, [formData.email, formData.password, formData.confirmPassword]);

  function showErr() {
    if (formData.email && formData.password && formData.confirmPassword) {
      if (!formData.email.match(/^.+@.+\..+$/)) {
        setErr("Use a valid email");
      } else if (formData.password.length < 8) {
        setErr("Password should be at least 8 characters");
      } else if (formData.password !== formData.confirmPassword) {
        setErr("Passwords do not match");
      } else {
        setErr("");
      }
    }
  }

  function authNewUser() {
    dispatch(authExpenseSignUp(formData));
    dispatch(activateToken());
  }

  function sendUsername() {
    const name = formData.email.match(/^(.+)@/)[1];
    localStorage.setItem("expenseUsername", name);
    dispatch(setUsername());
  }

  function handleFormData(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <>
        <h2 className="title">SignUp</h2>
        <form className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleFormData}
            required
          />
          <input
             className="auth-input"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            required
          />
          <input
             className="auth-input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormData}
            required
          />
        </form>
        {err ? <p style={{ color: "red" }}>{err}</p> : ""}
      <Link to="/welcome-page">
        <button
          className="auth-page-btn signup"
          onClick={() => {
            sendUsername();
            if (!err) {
              authNewUser();
            }
          }}
          
        >
          Sign Up
        </button>
      </Link>
    </>
  );
}
