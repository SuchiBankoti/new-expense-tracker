import React, { useState } from "react";
import { Link } from "react-router-dom";


const resetPassword="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0"
export default function ResetPassword() {
    const [userMail, setUserMail] = useState("")
    const handleChange = (e) => {
        setUserMail(e.target.value)
    }
    function sendLink() {
        fetch(resetPassword, {
            method: "POST",
            body: JSON.stringify({
              email: userMail,
              requestType:"PASSWORD_RESET"
            }),
            headers: {
              "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok){
              alert(
                "Link Sent please check your mail"
              );
            } else {
                alert("could not send link");
            }
          });
    }
    return (<div className="resetPasswordPage">
        <form>
            <input
                type="email"
                value={userMail}
                onChange={(e)=>handleChange(e)}
            />
        </form>
        <button onClick={sendLink}>
        Send Link
        </button>
        <div>Alredy a user?</div>
        <div>
            <Link to="/">
                <button>
                Login
                </button>
            </Link>
        </div>
    </div>)
}