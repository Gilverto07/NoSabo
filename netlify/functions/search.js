const { search } = require('../../../src/genius')

exports.handler = async (event) => {
    const { term } = event.queryStringParameters; // Get search term from query
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
};