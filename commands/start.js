const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    if (ctx.chat.type !== "private") return;

    try {
      const botInfo = await bot.telegram.getMe();
      const botUsername = botInfo.username;

      const welcomeText = 
`✨ *SUPREME MULTI-FUNCTION BOT* ✨
━━━━━━━━━━━━━━━━━━━━━━
👋 *Hello, ${ctx.from.first_name}!*

Main groups management aur professional 
promotions ke liye design kiya gaya hoon.

🚀 *MERE FEATURES:*
📢 *Promotion:* Mass group advertising
🎮 *Games:* Focus mode enabled games
🛡️ *Security:* Group anti-disturb protection
━━━━━━━━━━━━━━━━━━━━━━
Neeche diye gaye buttons use karein 👇`;

      await ctx.reply(welcomeText, {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [
            Markup.button.url("➕ Add Me to Your Group", `https://t.me/${botUsername}?startgroup=true`)
          ],
          [
            Markup.button.callback("📢 Start Promotion", "start_promo_check")
          ],
          [
            Markup.button.url("📢 Updates", "https://t.me/supremebothelper")
          ]
        ])
      });
    } catch (e) {
      console.error(e);
    }
  });

  // --- PROMOTION BUTTON HANDLER ---
  bot.action("start_promo_check", async (ctx) => {
    const userId = ctx.from.id;

    // 1. Check if user is Promo Admin
    if (global.promoAdmins && global.promoAdmins.includes(userId)) {
      // Agar admin hai toh Promotion Menu dikhaye
      await ctx.answerCbQuery("Access Granted! Opening Panel...");
      await ctx.editMessageText(
        "📢 *PROMOTION CONTROL PANEL*\n━━━━━━━━━━━━━━━\n" +
        "Admin: " + ctx.from.first_name + "\n\n" +
        "Aap niche diye gaye options se promotion shuru kar sakte hain:",
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            [Markup.button.callback("📑 List All Groups", "list_groups")],
            [Markup.button.callback("✅ Select All & Promote", "promo_all_start")],
            [Markup.button.callback("⬅️ Back to Menu", "back_to_start")]
          ])
        }
      );
    } else {
      // 2. Agar admin nahi hai toh Error aur Contact Owner button
      await ctx.answerCbQuery("❌ Access Denied!", { show_alert: true });
      await ctx.editMessageText(
        "⚠️ *PROMO ADMIN REQUIRED*\n━━━━━━━━━━━━━━━\n" +
        "Sorry! Is feature ko use karne ke liye aapke paas *Promo Admin* rank hona zaroori hai.\n\n" +
        "Admin banne ke liye neeche diye gaye button par click karke Owner se baat karein.",
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            [Markup.button.url("👑 Get Promo Admin", "@easyDeplover")], // Yahan apna link daalein
            [Markup.button.callback("⬅️ Back", "back_to_start")]
          ])
        }
      );
    }
  });

  // Back to start menu handler
  bot.action("back_to_start", async (ctx) => {
    await ctx.answerCbQuery();
    // Yahan wapas start wala code call kar sakte hain ya message edit kar sakte hain
    ctx.reply("Wapas menu pe jaane ke liye /start likhein."); 
  });
};
