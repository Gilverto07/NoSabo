import React, { useState } from "react"
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import LogIn from "./LogIn"

export default function Home(){

    const [lyrics, setLyrics] = useState('')
    const [search, setSearch] = useState('')

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

    const searchTerm = async () => {
        try{
            const res = await axios.get("http://localhost:5000/search" ,{
                params: { search_term: "el descuido del aguila"}
            })
            console.log(parseSongString(res.data.search))
            // const songDetails = getSongDetails(res.data.search)
            // setSearch(songDetails)
        }catch(err){
            console.log(err)
        }
    }

    function parseSongString(songsString) {
       // Step 1: Manually extract individual song objects from the string
        const songObjects = songsString.match(/{[^}]+}/g); // Use regex to find each object string

        // Step 2: Process each object string and manually extract the details
        return songObjects.map(songString => {
            // Extract the fullTitle and artist manually
            const fullTitleMatch = songString.match(/'fullTitle': '([^']+)'/);
            const artistMatch = songString.match(/'artist': '([^']+)'/);

            if (fullTitleMatch && artistMatch) {
            const fullTitle = fullTitleMatch[1]; // Extract the full title from the match
            const artist = artistMatch[1]; // Extract the artist from the match

            // Split the fullTitle by ' by ' to get the clean title
            const [title] = fullTitle.split(' by');

            return {
                title: title.trim(),  // Cleaned song title
                artist: artist        // The artist
            };
            }
        }).filter(Boolean); // Filter out any undefined matches
    }
      
    const logout = () => {
        localStorage.clear()
    }

    return(
        <>
            <p>New Project</p>
            <button onClick={fetchLyrics}>Get Lyrics</button>
            <button onClick={searchTerm}>Search</button>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {lyrics}
                {/* {console.log(search)} */}
            </div>

            {/* <button onClick={() =>{logout()}}>LogOut</button>
            <LogIn /> */}

        </>
    )
}