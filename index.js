require("dotenv").config();

const express = require("express");
const { Telegraf } = require("telegraf");

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🤖 Supreme Bot Running");
});

app.listen(PORT, () => {
  console.log(`🌐 Server Started On ${PORT}`);
});

// Commands
require("./commands/start")(bot);
require("./commands/admin")(bot);
require("./commands/fun")(bot);

// Events
require("./events/messages")(bot);
require("./events/welcome")(bot);

bot.launch().then(() => {
  console.log("✅ Supreme Bot Ready");
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
