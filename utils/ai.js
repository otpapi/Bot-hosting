const axios = require("axios");

const memory = {};

async function askAI(userId, message) {

  if (!memory[userId]) {
    memory[userId] = [];
  }

  try {

    const history = memory[userId]
      .map(m => `${m.role}: ${m.content}`)
      .join("\n");

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `
You are Supreme AI.

Rules:
- Reply in natural Hinglish.
- Funny and friendly.
- Use emojis naturally 😎😂🔥✨
- Keep replies short.
- Talk like a real friend.
- Never sound robotic.

Chat History:
${history}

User: ${message}
`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "😅 Kuch samajh nahi aaya bhai.";

    memory[userId].push(
      { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    if (memory[userId].length > 20) {
      memory[userId].splice(0, 2);
    }

    return reply;

  } catch (err) {

    console.error(
      "Gemini Error:",
      err.response?.data || err.message
    );

    return "😵 AI Error";
  }
}

module.exports = askAI;
