import React, { useState, useEffect } from "react"
import { redirectToAuthCodeFlow, getAccessToken, fetchProfile } from "../Api"
const clientId = import.meta.env.VITE_CLIENT_ID


export default function LogIn(){
    const [profile, setProfile] = useState(null)

    // const connectSpotify = async () =>{
    //     const params = new URLSearchParams(window.location.search)
    //     const code = params.get("code")
    //     let accessToken = localStorage.getItem("access_token")

    //     if (accessToken) {
    //         // Access token exists in localStorage, use it
    //         const profile = await fetchProfile(accessToken);
    //         setProfile(profile);
    //     } else if (code) {
    //         // Get a new access token using the authorization code
    //         accessToken = await getAccessToken(clientId, code);
    //         localStorage.setItem("access_token", accessToken);
    //         const profile = await fetchProfile(accessToken);
    //         setProfile(profile);
    //     } else {
    //         // No code or access token, redirect to Spotify authorization
    //         redirectToAuthCodeFlow(clientId);
    //     }
    // }


    useEffect(() => {
        // Check for access token in localStorage when the component mounts
        const accessToken = localStorage.getItem("access_token");
    
        if (accessToken) {
          // If token exists, fetch the user's profile
          fetchProfile(accessToken).then(profileData => {
            setProfile(profileData);
          }).catch(error => {
            console.error("Failed to fetch profile:", error);
            localStorage.removeItem("access_token");
          });
        }
      }, [])

      const connectSpotify = async () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
    
        if (!profile) {
          if (code) {
            // If there's an authorization code in the URL, exchange it for an access token
            const accessToken = await getAccessToken(clientId, code);
            localStorage.setItem("access_token", accessToken);
            const profileData = await fetchProfile(accessToken);
            setProfile(profileData);
          } else {
            // If no access token or code, redirect to the authorization flow
            redirectToAuthCodeFlow(clientId);
          }
        }
      };

    return(
        <>
            {!profile ? (
                <button onClick={() => {connectSpotify()}}>Connect to Spotify</button>
            ) : (
                <h1>welcome, {profile.display_name}</h1>
            )}
            {console.log(profile)}
        </>
    )
    
}