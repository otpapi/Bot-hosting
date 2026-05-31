const { Markup } = require("telegraf");

module.exports = (bot) => {

  bot.start(async (ctx) => {

    const text = `
🔥 Welcome ${ctx.from.first_name}

🤖 Supreme Bot Online

📌 Available Commands

/admins - Admin List
/ping - Bot Status
/mood - Random Mood
/funny - Random Joke
/ask <question> - AI Chat

⚡ Enjoy!
`;

    await ctx.reply(
      text,
      Markup.inlineKeyboard([
        [
          Markup.button.url(
            "➕ Add Me To Group",
            `https://t.me/${ctx.botInfo.username}?startgroup=true`
          )
        ]
      ])
    );

  });

};
