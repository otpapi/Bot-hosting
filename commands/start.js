const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    // Sirf Private Chat mein welcome message dikhaye
    if (ctx.chat.type !== "private") return;

    try {
      // Bot ka username khud nikalne ke liye
      const botInfo = await bot.telegram.getMe();
      const botUsername = botInfo.username;

      const welcomeText = 
`✨ *SUPREME MULTI-FUNCTION BOT* ✨
━━━━━━━━━━━━━━━━━━━━━━
👋 *Hello, ${ctx.from.first_name}!*

Main groups ko manage karne aur mazedaar 
games (Focus Mode ke sath) khelne ke liye 
banaya gaya hoon.

🚀 *FEATURES:*
🎮 *Pro Games:* Math Quiz & more
🛡️ *Focus Mode:* Anti-disturb protection
🤖 *AI Chat:* Powerful AI features
━━━━━━━━━━━━━━━━━━━━━━
Mujhe apne group mein add karne ke liye 
neeche diye gaye button par click karein! 👇`;

      await ctx.reply(welcomeText, {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [
            Markup.button.url(
              "➕ Add Me to Your Group", 
              `https://t.me/${botUsername}?startgroup=true`
            )
          ],
          [
            Markup.button.url("📢 Updates", "https://t.me/your_channel_link") // Optional
          ]
        ])
      });
    } catch (e) {
      console.error("Start Command Error:", e);
    }
  });
};
