const { Markup } = require("telegraf");

module.exports = (bot) => {

  // JOIN MESSAGE
  bot.on("new_chat_members", async (ctx) => {

    const members = ctx.message.new_chat_members;

    for (const user of members) {

      const username =
        user.username
          ? "@" + user.username
          : "NOT SET";

      const text = `
🌟 **WELCOME** @${user.first_name}!

📋 **GROUP**: ${ctx.chat.title}

🆔 **YOUR ID**: ${user.id}

👤 **USERNAME**: ${username}

🔥 Hope you find good vibes,
new friends and lots of fun here!
`;

      await ctx.reply(
        text,
        Markup.inlineKeyboard([
          [
            Markup.button.url(
              "➕ **ADD ME IN YOUR GROUP**",
              `https://t.me/${ctx.botInfo.username}?startgroup=true`
            )
          ]
        ])
      );
    }

  });

  // LEFT MESSAGE
  bot.on("left_chat_member", async (ctx) => {

    const user = ctx.message.left_chat_member;

    const username =
      user.username
        ? "@" + user.username
        : "NOT SET";

    const text = `
😢 **GOODBYE** @${user.first_name}

📋 **GROUP**: ${ctx.chat.title}

🆔 **USER ID**: ${user.id}

👤 **USERNAME**:@ ${username}

💔 User left the group.

We will miss you!
`;

    await ctx.reply(
      text,
      Markup.inlineKeyboard([
        [
          Markup.button.url(
            "➕ ADD ME IN YOUR GROUP",
            `https://t.me/${ctx.botInfo.username}?startgroup=true`
          )
        ]
      ])
    );

  });

};
