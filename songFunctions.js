import Genius from "genius-lyrics"
import { fetchLyrics } from "searchlyrics"
const client = new Genius.Client(process.env.VITE_GENIUS)
const songsClient = new Genius.SongsClient(client)


//returns the top five results of a search term
export async function search(searchTerm){
    try{
        let songsObject = []
        const searches = await client.songs.search(searchTerm)
        // console.log(searches)
        searches.forEach((song, index) =>{
            if(index >= 5) return 
            songsObject.push({
                index: index,
                fullTitle: song.fullTitle,
                songURL: song.url
            })
        })
        return songsObject
    }catch(error){
        console.error("Search Function Error: ", error)
        throw new Error("Error searching for songs")
    }
}

export async function getSongLyrics(song){
    try{
        console.log(song)
        const lyrics = await fetchLyrics(song)
        return lyrics.lyrics
    }catch(error){
        console.error("Get lyrics function error: ", error)
    }
}

// No Longer Works //

//returns the lyrics of a song, needs url as a parameter
// export async function getLyrics(song){
//     try{
//         const scrapedSong = await songsClient.scrape(song)
//         const lyrics = await scrapedSong.lyrics()
//         return lyrics
//     }catch(error){
//         console.error("Get Lyrics Function Error: ", error)
//         throw new Error("Error fetching lyrics")
//     }
// }