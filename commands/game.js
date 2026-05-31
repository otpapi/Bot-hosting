const { Markup } = require("telegraf");

module.exports = (bot) => {

  bot.command("game", async (ctx) => {

    await ctx.reply(
`🎮 SUPREME GAME CENTER

━━━━━━━━━━━━━━
🧠 Math Quiz Challenge
Test your speed & accuracy
━━━━━━━━━━━━━━

Choose a game below 👇`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "🧠 Start Math Quiz",
            "start_math_quiz"
          )
        ]
      ])
    );

  });

};
