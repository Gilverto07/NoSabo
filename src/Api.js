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
            model: 'gpt-4o',
            messages : [
                {
                    role: 'system', 
                    content: "You wil be given the lyrics to a song in spanish, some containing mexican slang. Translate to English and vice-versa if needed. Only return the translated lyrics." 
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
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Exit the loop when the stream ends
    
        buffer += decoder.decode(value, { stream: true });
    
        const parsedChunks = buffer.split('\n').filter(line => line.trim() !== '');
    
        for (const chunk of parsedChunks) {
          if (chunk === 'data: [DONE]') {
            console.log('Stream complete');
            return; // Stop processing further if [DONE] is encountered
          }
    
          try {
            const parsed = JSON.parse(chunk.replace(/^data: /, ''));
            const newContent = parsed.choices[0]?.delta?.content || '';
            yield newContent;
          } catch (error) {
            console.error('Error parsing chunk:', error, chunk); // Log the chunk that caused the error
          }
        }
    
        // Keep only unprocessed data in the buffer
        buffer = buffer.slice(buffer.lastIndexOf('\n') + 1);
      }
    
    
}

  
