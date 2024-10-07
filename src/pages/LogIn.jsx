import React, { useState } from "react"
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "../Api"
const clientId = import.meta.env.VITE_CLIENT_ID


export default function LogIn(){
    const [profile, setProfile] = useState(null)

    const connectSpotify = async () =>{
        const params = new URLSearchParams(window.location.search)
        const code = params.get("code")
        let accessToken = localStorage.getItem("access_token")

        if (accessToken) {
            // Access token exists in localStorage, use it
            const profile = await fetchProfile(accessToken);
            setProfile(profile);
        } else if (code) {
            // Get a new access token using the authorization code
            accessToken = await getAccessToken(clientId, code);
            localStorage.setItem("access_token", accessToken);
            const profile = await fetchProfile(accessToken);
            setProfile(profile);
        } else {
            // No code or access token, redirect to Spotify authorization
            redirectToAuthCodeFlow(clientId);
        }
    }

    return(
        <>
            {!profile ? (
                <button onClick={() => {connectSpotify()}}>Connect to Spotify</button>
            ) : (
                <h1>welcome, {profile.display_name}</h1>
            )}
        </>
    )
    
}