const axios = require("axios");

const memory = {};

async function askAI(userId, message) {

  if (!memory[userId]) {
    memory[userId] = [];
  }

  try {

    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-2-9b-it:free",
        messages: [
          {
            role: "system",
            content: "You are a friendly Hinglish Telegram bot."
          },
          ...memory[userId],
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    const reply = res.data.choices[0].message.content;

    memory[userId].push(
      { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    if (memory[userId].length > 10) {
      memory[userId].splice(0, 2);
    }

    return reply;

  } catch (e) {
    return "❌ AI Error";
  }
}

module.exports = askAI;
