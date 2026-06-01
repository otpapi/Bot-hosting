// commands/start.js
module.exports = (bot) => {
  bot.start(async (ctx) => {
    // Sirf private chat me hi chale
    if (ctx.chat.type !== "private") return;

    const userName = ctx.from.first_name || "User";

    // Professional welcome message
    const welcomeMessage = `
🔥 Oye ${userName} ji! Swagat hai ✨Supreme✨ mein! 😎

Mere features:
⚔️ Admin: /ban, /unban, /mute, /unmute, /kick
🤖 AI: /ask <question>
🎮 Games: /event, /hit, /scan, /match
📊 Stats: /level, /inactive

👇 Neeche buttons dabao
    `;

    // Buttons
    const buttons = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🤖 AI Chat", callback_data: "ai_chat" }],
          [{ text: "🎮 Games", callback_data: "games" }],
          [{ text: "📊 Stats", callback_data: "stats" }],
          [{ text: "⚙️ Settings", callback_data: "settings" }]
        ]
      }
    };

    // Send message
    await ctx.reply(welcomeMessage, buttons);
  });

  // Button callbacks handle
  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data;

    switch (data) {
      case "ai_chat":
        await ctx.answerCbQuery();
        await ctx.reply("🤖 AI Chat selected! /ask <question> likho.");
        break;
      case "games":
        await ctx.answerCbQuery();
        await ctx.reply("🎮 Games menu: /event, /hit, /scan, /match");
        break;
      case "stats":
        await ctx.answerCbQuery();
        await ctx.reply("📊 Stats: /level, /inactive");
        break;
      case "settings":
        await ctx.answerCbQuery();
        await ctx.reply("⚙️ Settings: coming soon!");
        break;
      default:
        await ctx.answerCbQuery();
        break;
    }
  });
};
