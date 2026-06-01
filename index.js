require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");

// ==========================================
// 👑 ADMIN CONFIGURATION (YAHAN LAGAO)
// ==========================================
global.ownerId = 8661288342; // <-- Yahan APNI Telegram ID daalo (@userinfobot se nikaal kar)
global.promoAdmins = [8661288342]; // Isme bhi apni ID daalo (Owner hamesha admin rahega)
// ==========================================

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);


// Commands
require("./commands/start")(bot);
require("./commands/game")(bot);
require("./commands/mathquiz")(bot); 
require("./commands/admin")(bot);
require("./commands/fun")(bot);

// Events
require("./events/messages")(bot);
require("./events/welcome")(bot);

// Webhook setup
const WEBHOOK_URL = process.env.WEBHOOK_URL; // Render URL e.g., https://your-app.onrender.com/bot
app.use(bot.webhookCallback("/bot"));

app.get("/", (req, res) => {
  res.send("🤖 Supreme Bot Running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Server Started");
});
