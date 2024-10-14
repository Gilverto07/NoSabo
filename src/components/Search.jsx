import React, { useState, useEffect } from "react"
import axios from "axios"
import Lyrics from "../pages/Lyrics"

export default function Search(){
    const [query, setQuery] = useState('')
    // const [suggestions, setSuggestions] = useState([])
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    const [lyrics, setLyrics] = useState('')

    const suggestions = [
        {title: "la people", artist: "peso pluma"},
        {title: "el lokeron", artist: "tito doble p"},
        {title: "la people3", artist: "peso"},
        {title: "la people4", artist: "peso"},
        {title: "la people5", artist: "peso"}
    ]

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    // useEffect(() => {
    //     const handler = setTimeout(() =>{
    //         setDebouncedQuery(query)
    //     }, 1000)
    //     return () => {
    //         clearTimeout(handler)
    //     }
    // }, [query])

    // useEffect(() => {
    //     const getSuggestions = async () =>{
    //         if(debouncedQuery.length > 0){
    //             const results = await fetchSuggestions(debouncedQuery)
    //             console.log(results)
    //             setSuggestions(results)
    //         }else{
    //             setSuggestions([])
    //         }
    //     }
    //     getSuggestions()
    // }, [debouncedQuery])

    // const fetchSuggestions = async (input) => {
    //     try{
    //         const res = await axios.get("http://localhost:5000/search" ,{
    //             params: { search_term: input}
    //         })
    //         console.log(input)
    //         return parseSongString(res.data.search)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    function parseSongString(songsString) {
        // Step 1: Manually extract individual song objects from the string
         const songObjects = songsString.match(/{[^}]+}/g);
 
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

     const fetchLyrics = async (title, artist) => {
        try{
        const res = await axios.get("http://localhost:5000/get-lyrics", {
            params:{ song_title: title, artist_name: artist}
        })
        setLyrics(res.data.lyrics)
        } catch(err){
        console.log(err)
        }
    }

    return(
        <>
            <div className="title">
                <h1 className="title-name">
                <a href="/">No Sabo</a>
                </h1>
            </div>

            <div className="search">
                <input
                type="text"
                value={query}
                onChange={(handleInputChange)}
                className="search-song"
                placeholder="Search for the lyrics of a song..."
                id="search-input"
                />
                {suggestions.length > 0 && (
                    <ul className="results" id="results">
                    {suggestions.map((suggestion) => (
                        <li onClick={() => fetchLyrics(suggestion.title, suggestion.artist)}key={suggestion.title} className="result">
                        {suggestion.title} - {suggestion.artist}
                        </li>
                    ))}
                    </ul>
                )}
                <Lyrics lyrics={lyrics}/>
            </div>
        </>
    )
}