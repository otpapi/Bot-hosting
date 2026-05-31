module.exports = (bot) => {

  // Welcome
  bot.on("new_chat_members", async (ctx) => {

    const members = ctx.message.new_chat_members;

    for (let user of members) {

      await ctx.reply(
        `🎉 Welcome ${user.first_name}

👋 ${ctx.chat.title} me swagat hai.

🔥 Enjoy your stay!`
      );

    }

  });

  // Goodbye
  bot.on("left_chat_member", async (ctx) => {

    const user =
      ctx.message.left_chat_member;

    await ctx.reply(
      `😢 ${user.first_name} left the group.`
    );

  });

};
