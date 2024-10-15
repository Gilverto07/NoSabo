//Authorization code flow with PKCE from the spotify api documentation
// import dotenv from "dotenv"
// dotenv.config()

const clientId = import.meta.env.VITE_CLIENT_ID
const params = new URLSearchParams(window.location.search)
const code = params.get("code")
let accessToken = localStorage.getItem("access_token") //

// if(!code){
//     redirectToAuthCodeFlow(clientId)
// }else{
//     const accessToken = await getAccessToken(clientId, code)
//     const profile = await fetchProfile(accessToken)
//     console.log(profile)
//     populateUI(profile)
// }
// if (accessToken) {
//     // Access token exists in localStorage, use it
//     const profile = await fetchProfile(accessToken);
//     populateUI(profile);
// } else if (code) {
//     // Get a new access token using the authorization code
//     accessToken = await getAccessToken(clientId, code);
//     localStorage.setItem("access_token", accessToken);
//     const profile = await fetchProfile(accessToken);
//     populateUI(profile);
// } else {
//     // No code or access token, redirect to Spotify authorization
//     redirectToAuthCodeFlow(clientId);
// }

export async function redirectToAuthCodeFlow(clientId){
    const verifier = generateCodeVerifier(128)
    const challange = await generateCodeChallenge(verifier)
    
    localStorage.setItem("verifier", verifier)

    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("response_type", "code")
    params.append("redirect_uri", "http://localhost:5173/")
    params.append("scope", "user-read-private user-read-email")
    params.append("code_challenge_method", "S256")
    params.append("code_challenge", challange)

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

function generateCodeVerifier(length){
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

async function generateCodeChallenge(codeVerifier){
    const data = new TextEncoder().encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (result.status === 401) {
        // Token expired or invalid, handle it
        localStorage.removeItem("access_token");
        redirectToAuthCodeFlow(clientId);
    }

    return await result.json();
}

///////////////openai API//////////////////

const apiKey = import.meta.env.VITE_CHATGPT

export async function* streamChatResponse(prompt){
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages : [
                {
                    role: 'system', 
                    content: "You wil be given the lyrics to a song in spanish, some containing slang. Translate to English and vice-versa if needed. Only return the translated lyrics." 
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            stream: true,
        }),
    })
    

    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''
    
    while (true){
        const { done, value } = await reader.read()
        if(done){
            break
        } 
        result += decoder.decode(value, { stream: true })
        const parsed = parseStreamChunk(result)
        if(parsed){
            yield parsed
        } 
    }
}

function parseStreamChunk(chunk) {
    try {
      const lines = chunk.split('\n').filter(line => line.trim() !== '' && line.startsWith('data: '));
      const jsonData = lines.map(line => JSON.parse(line.replace(/^data: /, '')));
      return jsonData.map(item => item.choices[0]?.delta.content)?.join('');
    } catch (error) {
      console.error('Error parsing chunk:', error);
      return null;
    }
}
  
