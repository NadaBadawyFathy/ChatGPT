import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function sendMsgOpenAI(message) {
    try {
        const res = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0 
        });
        return res.choices[0].message.content;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error("Rate limit exceeded. Please check your quota and try again later.");
        } else {
            console.error("Error communicating with OpenAI API:", error);
        }
        throw error;
    }
}
