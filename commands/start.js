const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    try {
      const user = ctx.from;
      const username = user.username ? `@${user.username}` : "Not Set";

      const welcomeMessage = `
🔥 Oye ${user.first_name} ji! Swagat hai ✨Supreme✨ mein! 😎

Main is Group ka King hoon. Mere features:

⚔️ Admin: /ban, /unban, /mute, /unmute, /kick
🤖 AI: /ask <question> se baatein karo
🎮 Games: /event, /hit, /scan, /match
📊 Stats: /level, /inactive

Niche buttons dabao 👇
      `;

      const menuButtons = Markup.inlineKeyboard([
        [Markup.button.callback("⚔️ Admin", "menu_admin"), Markup.button.callback("🤖 AI", "menu_ai")],
        [Markup.button.callback("🎮 Games", "menu_games"), Markup.button.callback("📊 Stats", "menu_stats")],
        [Markup.button.url("➕ Add Me To Group 🔥", "https://t.me/YourBotUsername?startgroup=true")]
      ]);

      await ctx.replyWithMarkdownV2(welcomeMessage, menuButtons);
    } catch (error) {
      console.error(error);
    }
  });

  // Example of button handler
  bot.action("menu_admin", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("⚔️ Admin Commands:\n/ban\n/unban\n/mute\n/unmute\n/kick");
  });

  bot.action("menu_ai", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("🤖 AI Commands:\n/ask <question>");
  });

  bot.action("menu_games", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("🎮 Games Commands:\n/event\n/hit\n/scan\n/match");
  });

  bot.action("menu_stats", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply("📊 Stats Commands:\n/level\n/inactive");
  });
};
