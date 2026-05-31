const { isAdmin } = require("../utils/helpers");

module.exports = (bot) => {

  // BAN
  bot.command("ban", async (ctx) => {

    if (!(await isAdmin(ctx))) {
      return;
    }

    if (!ctx.message.reply_to_message) {
      return ctx.reply("Reply karo user ko");
    }

    await ctx.banChatMember(
      ctx.message.reply_to_message.from.id
    );

    ctx.reply("🚫 User Banned");
  });

  // UNBAN
  bot.command("unban", async (ctx) => {

    if (!(await isAdmin(ctx))) {
      return;
    }

    if (!ctx.message.reply_to_message) {
      return;
    }

    await ctx.unbanChatMember(
      ctx.message.reply_to_message.from.id
    );

    ctx.reply("✅ User Unbanned");
  });

  // KICK
  bot.command("kick", async (ctx) => {

    if (!(await isAdmin(ctx))) {
      return;
    }

    if (!ctx.message.reply_to_message) {
      return;
    }

    const uid =
      ctx.message.reply_to_message.from.id;

    await ctx.banChatMember(uid);
    await ctx.unbanChatMember(uid);

    ctx.reply("👢 User Kicked");
  });

  // MUTE
  bot.command("mute", async (ctx) => {

    if (!(await isAdmin(ctx))) {
      return;
    }

    if (!ctx.message.reply_to_message) {
      return;
    }

    await ctx.restrictChatMember(
      ctx.message.reply_to_message.from.id,
      {
        can_send_messages: false
      }
    );

    ctx.reply("🔇 User Muted");
  });

  // UNMUTE
  bot.command("unmute", async (ctx) => {

    if (!(await isAdmin(ctx))) {
      return;
    }

    if (!ctx.message.reply_to_message) {
      return;
    }

    await ctx.restrictChatMember(
      ctx.message.reply_to_message.from.id,
      {
        can_send_messages: true
      }
    );

    ctx.reply("🔊 User Unmuted");
  });

};
