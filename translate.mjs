import OpenAI from "openai"
import dotenv from "dotenv"
dotenv.config()
const apiKey = process.env.VITE_CHATGPT

const openai = new OpenAI({
    organization: "org-bAeUh98gvUGpQgo9XooJhofs",
    project: "proj_bPo9xLHpOP8eXQFLRNB6QzxL",
    apiKey: apiKey
}) 

async function main(){
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "Say this is a test"}
        ],
        stream: true,
    })
    for await(const chunk of stream){
        process.stdout.write(chunk.choices[0]?.delta?.content || "")
    }
}

main()