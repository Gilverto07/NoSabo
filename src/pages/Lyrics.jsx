import React, { useState } from "react"
import { streamChatResponse } from "../Api"

export default function Lyrics(props){
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const cleanLyrics = (str) =>{
        const regex = /you might also like/i
        str = str.replace(regex,"")
        const lines = str.split('\n')
        return lines.slice(3).join('\n')
    }

    const callStream = async() => {
        setResponse('')
        setIsLoading(true)

        try {
            const stream = streamChatResponse(props.lyrics);
            for await (const chunk of stream) {
              setResponse((prev) => prev + chunk); // Update response with new chunk
            }
          } catch (error) {
            console.error('Error streaming response:', error);
          } finally {
            setIsLoading(false);
          }
    }

    return(
        <>
            <div className="lyrics">
                <div className="lyrics-left-side">
                    {cleanLyrics(props.lyrics)}
                </div>
                <div className="lyrics-right-side">
                    <p>{response}</p>
                </div>
            </div>
            <button onClick={callStream} disabled={isLoading} className="lyrics-button">
                {isLoading ? 'Loading...': "Translate"}
            </button>
        </>
    )
}