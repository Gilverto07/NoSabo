import React, { useState } from "react"
import axios from 'axios'
import LogIn from "./LogIn"

export default function Home(){

    const [lyrics, setLyrics] = useState('')

    const fetchLyrics = async () => {
        try{
        const res = await axios.get("http://localhost:5000/get-lyrics", {
            params:{ song_title: "la people", artist_name: "peso pluma"}
        })
        setLyrics(res.data.lyrics)
        } catch(err){
        console.log(err)
        }
    }

    

    
      
    const logout = () => {
        localStorage.clear()
    }

    return(
        <>
            <p>New Project</p>
            <button onClick={fetchLyrics}>Get Lyrics</button>
            {/* <button onClick={searchTerm}>Search</button> */}
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {lyrics}
                {/* {console.log(search)} */}
            </div>

            {/* <button onClick={() =>{logout()}}>LogOut</button>
            <LogIn /> */}

        </>
    )
}