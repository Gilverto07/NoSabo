import React, { useState } from "react"
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import LogIn from "./LogIn"

export default function Home(){

    const [lyrics, setLyrics] = useState('')

    const fetchLyrics = async () => {
        try{
        const res = await axios.get("http://localhost:5000/get-lyrics", {
            params:{ song_title: "la people", artist_name: "Peso Pluma"}
        })

        const cleanedLyrics = res.data.lyrics
        .replace(/^Searching for.*Lyrics:/, '')  // Remove the "Searching for..." and "Done." part
        .replace(/See  Live.*/, '')    // Remove the trailing "See Peso Pluma Live" and related parts
        .trim(); 

        
        setLyrics(cleanedLyrics)
        } catch(err){
        console.log(err)
        }
    }

    const logout = () => {
        localStorage.clear()
    }

    return(
        <>
            {/* <p>New Project</p>
            <button onClick={fetchLyrics}>Get Lyrics</button>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {lyrics}
                {console.log(lyrics)}
            </div> */}

            <button onClick={() =>{logout()}}>LogOut</button>
            <LogIn />

        </>
    )
}