import React from "react"

export default function Lyrics(props){

    const cleanLyrics = (str) =>{
        const regex = /you might also like/i
        str = str.replace(regex,"")
        const lines = str.split('\n')
        return lines.slice(3).join('\n')
    }

    return(
        <>
            <div className="lyrics">
                <div className="lyrics-left-side">
                    {cleanLyrics(props.lyrics)}
                </div>
                <div className="lyrics-right-side">
                    <p>Lyrics go here</p>
                </div>
            </div>
        </>
    )
}