import { search } from '../../genius';

//netlify serverless function used to handle api call for search
export async function handler(event) {
    const { term } = event.queryStringParameters;
    try {
        const results = await search(term);
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        console.error('Search Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to search songs' }),
        };
    }
}