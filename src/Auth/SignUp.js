import React, { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { activateToken, authExpenseSignUp, setUsername } from "../Store/CreateSlice";


export default function SignUpForm() {
    // const username = email.match(/^(.+)@/)[1];

  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  function validatePassword() {
    setFormData((prev) => {
      return {
        ...prev,
        confirmPassword: "",
      };
    });
    setErr("Password do not match. Try again");
  }

  function authNewUser() {
    dispatch(authExpenseSignUp(formData))
    dispatch(activateToken())
   
  }
  function sendUsername() {
    const name = formData.email.match(/^(.+)@/)[1];
    localStorage.setItem("expenseUsername",name)
    dispatch(setUsername())
}

  function handleFormData(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    setIsFormValid(formData.email && formData.password && formData.confirmPassword);
  }, [formData.email, formData.password, formData.confirmPassword]);

  return (
    <div className="authSubPage">
      <div>
        <h2 className="authPageTitle">SignUp</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleFormData}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormData}
            required
          />
        </form>
        {err ? <p style={{ color: "red" }}>{err}</p> : ""}
      </div>
      <Link to="/username-page">
        <button
          className="authPageBtn"
          onClick={() => {
            sendUsername()
            if (formData.password === formData.confirmPassword) {
              setFormData("");
              authNewUser();
            } else {
              validatePassword();
            }
          }}
          disabled={!isFormValid}
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
}
