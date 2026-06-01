const { Markup } = require("telegraf");

module.exports = (bot) => {
  // /game command sirf yahan rahega
  bot.command("game", async (ctx) => {
    try {
      await ctx.reply(
        `🎮 *SUPREME GAME CENTER*\n\n━━━━━━━━━━━━━━\n🧠 *Math Quiz Challenge*\nTest your speed & accuracy\n━━━━━━━━━━━━━━\n\nChoose a game below 👇`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            [Markup.button.callback("🧠 Start Math Quiz", "start_math_quiz")]
          ])
        }
      );
    } catch (e) {
      console.error("Game Menu Error:", e);
    }
  });
};
