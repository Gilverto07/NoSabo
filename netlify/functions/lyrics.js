import { getLyrics } from "../../genius";

export async function handler(event) {
    const { input } = event.queryStringParameters; 
    try {
        const lyrics = await getLyrics(input);
        return {
            statusCode: 200,
            body: JSON.stringify({ lyrics }),
        };
    } catch (error) {
        console.error('Lyrics Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to get lyrics' }),
        };
    }
}