import { exec } from 'child_process'
import express from 'express'
import cors from "cors"

const app = express()
const port = 5000

app.use(cors())

app.get('/get-lyrics', (req, res) =>{
    const songTitle = req.query.song_title
    const artistName = req.query.artist_name || ''

    // Run the python script with the song name and artist as arguments
    exec(`python scripts/lyricsApi.py "${songTitle}" "${artistName}"`, (error, stdout, stderr) => {
        if(error){
            console.error(`Error executing python script: ${error.message}`)
            return res.status(500).send("Server Error")
        }
        if(stderr){
            console.error(`Python script stderr: ${stderr}`)
            return res.status(500).send("Error fetching lyrics")
        }

        //send the lyrics back to the client
        res.send({lyrics: stdout })
    })
})



app.get('/search', (req, res) =>{
    const searchTerm = req.query.search_term

    // Run the python script with the song name and artist as arguments
    exec(`python scripts/lyricsApi.py "${searchTerm}" `, (error, stdout, stderr) => {
        if(error){
            console.error(`Error executing python script: ${error.message}`)
            return res.status(500).send("Server Error")
        }
        if(stderr){
            console.error(`Python script stderr: ${stderr}`)
            return res.status(500).send("Error Searching")
        }

        //send the search back to the client
        res.send({search: stdout })
    })
})

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})