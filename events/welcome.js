const { Markup } = require("telegraf");

module.exports = (bot) => {

  // MEMBER JOIN
  bot.on("new_chat_members", async (ctx) => {

    const members = ctx.message.new_chat_members;

    for (const user of members) {

      const fullName = [
        user.first_name,
        user.last_name
      ]
        .filter(Boolean)
        .join(" ");

      const username = user.username
        ? "@" + user.username
        : "NOT SET";

      const mention = `<a href="tg://user?id=${user.id}">${fullName}</a>`;

      const text = `
🌟 <b>WELCOME</b> ${mention}!
📋 <b>GROUP</b>: ${ctx.chat.title}
🆔 <b>YOUR ID</b>: <code>${user.id}</code>
👤 <b>USERNAME</b>: ${username}

🔥 Hope you find good vibes,
new friends and lots of fun here!
`;

      await ctx.reply(
        text,
        {
          parse_mode: "HTML",
          ...Markup.inlineKeyboard([
            [
              Markup.button.url(
                "➕ ADD ME IN YOUR GROUP",
                `https://t.me/${ctx.botInfo.username}?startgroup=true`
              )
            ]
          ])
        }
      );

    }

  });

  // MEMBER LEFT
  bot.on("left_chat_member", async (ctx) => {

    const user = ctx.message.left_chat_member;

    const fullName = [
      user.first_name,
      user.last_name
    ]
      .filter(Boolean)
      .join(" ");

    const username = user.username
      ? "@" + user.username
      : "NOT SET";

    const text = `
😢 <b>GOODBYE</b> ${fullName}
📋 <b>GROUP</b>: ${ctx.chat.title}
🆔 <b>USER ID</b>: <code>${user.id}</code>
👤 <b>USERNAME</b>: ${username}

💔 User left the group.
We will miss you!
`;

    await ctx.reply(
      text,
      {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard([
          [
            Markup.button.url(
              "➕ ADD ME IN YOUR GROUP",
              `https://t.me/${ctx.botInfo.username}?startgroup=true`
            )
          ]
        ])
      }
    );

  });

};
