const { Markup } = require("telegraf");

module.exports = (bot) => {

  bot.start(async (ctx) => {

    let msg =
`🔥 Welcome ${ctx.from.first_name}

🤖 Supreme Bot Ready

⚔️ Admin Commands
🎮 Fun Commands
📊 Group Tools

/help likho`;

    return ctx.reply(
      msg,
      Markup.inlineKeyboard([
        [
          Markup.button.url(
            "➕ Add Me",
            `https://t.me/${ctx.botInfo.username}?startgroup=true`
          )
        ]
      ])
    );

  });

};
