import React from "react"
import { useNavigate } from "react-router-dom"


export default function LandingPage(){
        const navigate = useNavigate()
        
            const handleGuestClick = () =>{
                navigate('/guest')
            }
        
            const handleLoginClick = () =>{
                navigate('/account')
            }
    return(
        <>
            <div className="landing-container">
                <h1>Welcome to the App</h1>
                <p>Select an option to continue:</p>
                <div className="button-container">
                    <button className="guest-button" onClick={handleGuestClick}>
                    Continue as Guest
                    </button>
                    <button className="login-button" onClick={handleLoginClick}>
                    Log in
                    </button>
                </div>
            </div>
        </>
    )
}