import React, { useState } from "react";
import { Configuration, OpenAI } from "openai"
function Chatgpt() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const configuration = {
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      };
      const openai = new OpenAI(configuration)

      const fetchBotReply = async () => {
        const completion = await openai.chat.completions
          .create({
            messages: [
              {
                role: "system",
                content: `"Generate a 4-day itinerary in JSON format for a trip to ${prompt}. Include details for each day, specifying morning, afternoon, and evening activities. Highlight key attractions, dining recommendations, and any unique local experiences. Feel free to customize the itinerary based on a mix of cultural, historical, and leisure activities for a memorable trip to Jaipur."
 
                ###
                Prompt: ${prompt}`,
              },
            ],
            model: "gpt-3.5-turbo",
          })
        .then((response) => {
            console.log(response);
            setResponse(response.choices[0].message.content);
          });
    
        console.log(completion);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchBotReply();
        //const responseData = await response.json();
        //setResponse(responseData.choices[0].text);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default Chatgpt;


