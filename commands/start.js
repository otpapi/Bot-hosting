const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    // Only work in private chats
    if (ctx.chat.type !== "private") return;

    const userName = ctx.from.first_name || "User";
    const userId = ctx.from.id;

    // Professional UI Message
    const welcomeMessage = 
`✨ *SUPREME MULTI-FUNCTION BOT* ✨
━━━━━━━━━━━━━━━━━━━━━━
👋 *Swagat hai, ${userName}!*

Main ek powerful bot hoon jo aapki chat ko 
easy aur mazedaar bana sakta hoon. 

🚀 *MERE TOP FEATURES:*
🛡️ *Admin:* Ban, Mute, Kick & more
🤖 *AI:* Chat with GPT /ask <question>
🎮 *Games:* Fun games & challenges
📊 *Stats:* Level, XP & Leaderboard
━━━━━━━━━━━━━━━━━━━━━━
👇 *Neeche diye gaye buttons use karein:*`;

    // Professional Button Layout
    const buttons = Markup.inlineKeyboard([
      [
        Markup.button.callback("🤖 AI Chat", "start_ai"),
        Markup.button.callback("🎮 Play Games", "start_games_menu")
      ],
      [
        Markup.button.callback("📊 My Stats", "start_stats"),
        Markup.button.callback("⚙️ Settings", "start_settings")
      ],
      [
        Markup.button.url("📢 Updates Channel", "https://t.me/your_channel") // Apna channel link daalein
      ]
    ]);

    // Send Welcome Message with Photo (Optional: replace URL with your image)
    try {
      await ctx.replyWithPhoto(
        "https://i.ibb.co/vzY6pX0/supreme-bot.jpg", // Yahan apni image link daal sakte hain
        {
          caption: welcomeMessage,
          parse_mode: "Markdown",
          ...buttons
        }
      );
    } catch (e) {
      // If photo fails, send text only
      await ctx.reply(welcomeMessage, {
        parse_mode: "Markdown",
        ...buttons
      });
    }
  });

  // --- BUTTON HANDLERS (Alag-Alag bot.action) ---

  bot.action("start_ai", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("🤖 *AI CHAT MODE*\n\n/ask <question> likh kar mujhse kuch bhi puchein!", { parse_mode: "Markdown" });
  });

  bot.action("start_games_menu", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("🎮 *GAME CENTER*\n\nGames khelne ke liye `/game` command ka use karein!", { parse_mode: "Markdown" });
  });

  bot.action("start_stats", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("📊 *USER STATS*\n\nLevel: 1\nXP: 100\nRank: Rookie\n\n(Feature coming soon!)", { parse_mode: "Markdown" });
  });

  bot.action("start_settings", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("⚙️ *BOT SETTINGS*\n\nYahan se aap bot ki settings change kar sakte hain.", { parse_mode: "Markdown" });
  });

};
