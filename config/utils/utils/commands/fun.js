const askAI = require("../utils/ai");

module.exports = (bot) => {

  bot.command("ask", async (ctx) => {

    let text =
      ctx.message.text.split(" ")
      .slice(1)
      .join(" ");

    if (!text) {
      return ctx.reply("Question likho");
    }

    const reply =
      await askAI(
        ctx.from.id,
        text
      );

    ctx.reply(reply);

  });

  bot.command("ping", (ctx) => {
    ctx.reply("🏓 Pong");
  });

  bot.command("mood", (ctx) => {

    const moods = [
      "🔥 OP",
      "😎 Cool",
      "😴 Sleepy",
      "💀 Dead"
    ];

    ctx.reply(
      moods[
        Math.floor(
          Math.random() * moods.length
        )
      ]
    );

  });

};
