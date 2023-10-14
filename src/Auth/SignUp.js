import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";

const signupApi = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";

export default function SignUpForm() {
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
    if (formData.email && formData.password && formData.confirmPassword) {
      fetch(signupApi, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              localStorage.setItem("token", data.idToken);
              alert("Account Successfully created");
            });
          } else {
            alert("Authentication Failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handleFormData(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // Check if the form is valid (all fields are filled) and set isFormValid accordingly
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
      <Link to="/welcome-page">
        <button
          className="authPageBtn"
          onClick={() => {
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
