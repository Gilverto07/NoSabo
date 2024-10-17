import React, { useState, useEffect } from "react"
import axios from "axios"
import Lyrics from "../pages/Lyrics"

export default function Search(){
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [debouncedQuery, setDebouncedQuery] = useState(query)
    const [lyrics, setLyrics] = useState('')

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    //sets delay before api can be called
    useEffect(() => {
        const handler = setTimeout(() =>{
            setDebouncedQuery(query)
        }, 1000)
        return () => {
            clearTimeout(handler)
        }
    }, [query])

    // if no more delay call fetchSuggestions 
    useEffect(() => {
        const getSuggestions = async () =>{
            if(debouncedQuery.length > 0){
                const results = await fetchSuggestions(debouncedQuery)
                setSuggestions(results)
            }else{
                setSuggestions([])
            }
        }
        getSuggestions()
    }, [debouncedQuery])

    //returns array containing song data
    const fetchSuggestions = async (input) => {
        try{
            const res = await axios.get("../../netlify/functions/search" ,{
                params: { input }
            })
            return res.data //array of songs 
        }catch(err){
            console.log(err)
        }
    }

    //returns lyrics
     const fetchLyrics = async (input) => {
        try{
        const res = await axios.get("../../netlify/functions/search/lyrics", {
            params:{ input }
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
                        <li onClick={() => fetchLyrics(suggestion.songURL)} key={suggestion.index}className="result">
                        {suggestion.fullTitle}
                        </li>
                    ))}
                    </ul>
                )}
                <Lyrics lyrics={lyrics}/>
            </div>
        </>
    )
}