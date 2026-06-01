const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.command("game", async (ctx) => {
    const name = ctx.from.first_name;
    
    const menuMsg = await ctx.reply(
      `🎮 *SUPREME ARCADE CENTER* 🎮\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Welcome, *${name}*!\n\n` +
      `Choose a challenge from the list below and test your skills.\n\n` +
      `🧠 *Math Quiz:* Speed & Accuracy\n` +
      `⏳ *Note:* This menu will auto-delete in 5 mins.\n` +
      `━━━━━━━━━━━━━━━━━━━━━━`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("🧠 Start Math Quiz", "start_math_quiz")],
          [Markup.button.callback("❌ Close Menu", "delete_msg")]
        ])
      }
    );

    // 5 Minute baad delete karne ke liye (300,000 ms)
    setTimeout(() => {
      ctx.deleteMessage(menuMsg.message_id).catch(() => {});
    }, 300000);
  });

  bot.action("delete_msg", (ctx) => ctx.deleteMessage().catch(() => {}));
};
