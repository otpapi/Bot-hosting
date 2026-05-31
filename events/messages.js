module.exports = (bot) => {

  bot.on("message", async (ctx, next) => {

    if (!ctx.message || !ctx.from) {
      return next();
    }

    // Bot message ignore
    if (ctx.from.is_bot) {
      return next();
    }

    // Hi Reply
    if (
      ctx.message.text &&
      ctx.message.text.toLowerCase() === "hi"
    ) {
      await ctx.reply(
        `👋 Hello ${ctx.from.first_name}!`
      );
    }

    // Good Morning
    if (
      ctx.message.text &&
      ctx.message.text.toLowerCase() === "good morning"
    ) {
      await ctx.reply(
        "🌞 Good Morning Bhai 😎"
      );
    }

    // Good Night
    if (
      ctx.message.text &&
      ctx.message.text.toLowerCase() === "good night"
    ) {
      await ctx.reply(
        "🌙 Good Night Dost 😴"
      );
    }

    return next();

  });

};
