import Genius from "genius-lyrics"
const Client = new Genius.Client("6XoHyHWlWortut18crOYYrZZh-dGlNhSqcWAd9vKyS4k3VOBnuxCqDzG-xnCzUxj")
const SongsClient = new Genius.SongsClient(Client)

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

export async function getLyrics(song){
    const scrapedSong = await SongsClient.scrape(song)
    const lyrics = await scrapedSong.lyrics()
    return lyrics
}