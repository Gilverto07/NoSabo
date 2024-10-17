import Genius from "genius-lyrics"
const Client = new Genius.Client(process.env.VITE_GENIUS)
const SongsClient = new Genius.SongsClient(Client)

//returns the top five results of a search term
export async function search(searchTerm){
    let songsObject = []
    const searches = await Client.songs.search(searchTerm)
    searches.forEach((song, index) =>{
        if(index >= 5) return 
        songsObject.push({
            index: index,
            fullTitle: song.fullTitle,
            songURL: song.url
        })
    })
    return songsObject
}

//returns the lyrics of a song, needs url as a parameter
export async function getLyrics(song){
    const scrapedSong = await SongsClient.scrape(song)
    const lyrics = await scrapedSong.lyrics()
    return lyrics
}