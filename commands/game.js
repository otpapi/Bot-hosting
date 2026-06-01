// commands/game.js
const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.command("game", async (ctx) => {
    await ctx.reply(
      `🎮 *SUPREME GAME CENTER*\nChoose a game below 👇`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("🧠 Math Quiz", "start_math_quiz")],
          // [Markup.button.callback("🎮 New Game", "start_new_game")] <-- Baad me add karne ke liye
        ])
      }
    );
  });
};
