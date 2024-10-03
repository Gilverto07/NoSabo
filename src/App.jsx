import React, { useState } from "react"
import axios from 'axios'
import './App.css'


function App() {

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
  
  return (
    <>
      <p>New Project</p>
      <button onClick={fetchLyrics}>Get Lyrics</button>
      <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {lyrics}
        {console.log(lyrics)}
      </div>
    </>
  )
}

export default App
