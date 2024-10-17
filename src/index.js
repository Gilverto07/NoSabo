import express from 'express'
import { search, getLyrics } from "../genius.js"
import cors from "cors"

const app = express()
const port = 5000

app.use(express.json(), cors())

app.get('/search', async (req, res) =>{
    const { input } = req.query
    try{
        const results = await search(input)
        res.json(results)
    }catch(error){
        res.status(500).json({ error: "Failed to search songs" })
    }
})

app.get('/lyrics', async (req, res) =>{
    const { input } = req.query
    try{
        const lyrics = await getLyrics(input)
        res.json({ lyrics })
    }catch(error){
        res.status(500).json({ error: "Failed to get lyrics" })
    }
})

app.listen(port, () =>{
    console.log(`server running on port: ${port}`)
})