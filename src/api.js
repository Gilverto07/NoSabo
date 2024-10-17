///////////////openai API//////////////////
const apiKey = import.meta.env.VITE_CHATGPT

// Generator function to be able to stream response
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

    //parses chunks 
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
    
        buffer += decoder.decode(value, { stream: true });
    
        const parsedChunks = buffer.split('\n').filter(line => line.trim() !== '');
    
        for (const chunk of parsedChunks) {
            
            // Stop processing further if [DONE] is encountered
            if (chunk === 'data: [DONE]') {
                console.log('Stream complete');
                return; 
            }
    
          try {
            const parsed = JSON.parse(chunk.replace(/^data: /, ''));
            const newContent = parsed.choices[0]?.delta?.content || '';
            yield newContent;
          } catch (error) {
            console.error('Error parsing chunk:', error, chunk); 
          }
        }
    
        // Keep only unprocessed data in the buffer
        buffer = buffer.slice(buffer.lastIndexOf('\n') + 1);
      }
}

  
