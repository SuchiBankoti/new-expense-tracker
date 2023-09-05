import React, { useEffect, useState } from "react";

const profileApi = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvMhMxDWfRmYEbmRy4ORKoiOLsxpVokq0";

export default function WelcomePage() {
    const [profile, setProfile] = useState(false)
    const[token,setToken]=useState("")
    const [formData, setFormData] = useState({
        name: "",
        profilePictureUrl:""
    })
    function handleChange(e) {
        setFormData(perv=>({...perv,[e.target.name]:e.target.value}))
    }
    useEffect(() => {
        const temp = localStorage.getItem("token")
        setToken(temp)
    }, [profile])
    
    function updateProfile() {
        fetch(profileApi, {
            method: "POST",
            body: JSON.stringify({
                idToken:token,
                displayName: formData.name,
                photoUrl: formData.profilePictureUrl,
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
                    alert("Profile Successfully updated");
                });
            } else {
                alert("Profile Update Failed");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
    return (
        <div>
            <div style={{display:"flex"}}>
            <h1>Welcome To expense tracker</h1>
            <div>Your profile is Incomplete.<span onClick={() => setProfile(true)} style={{color:"blue",cursor:"pointer"}}>Complete Now</span></div>
            </div>
            {
                profile? <div className="Profile">
                <form>
                    <label>Full name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange}/>
                    <label>Profile Photo url</label>
                    <input name="profilePictureUrl" type="url" value={formData.profilePictureUrl} onChange={handleChange}/>
                    </form>
                    <button onClick={updateProfile}>Update</button>
            </div>:""
            }
           
        </div>
    )
}