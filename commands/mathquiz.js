const { Markup } = require("telegraf");
const quizData = {};

function generateQuestion() {
  const a = Math.floor(Math.random() * 30) + 1;
  const b = Math.floor(Math.random() * 30) + 1;
  const correct = a + b;
  let options = [correct, correct + 5, correct - 3, correct + 10].sort(() => Math.random() - 0.5);
  return { qText: `${a} + ${b} = ?`, correct, options };
}

module.exports = (bot) => {
  bot.action("start_math_quiz", async (ctx) => {
    await ctx.answerCbQuery();
    const userId = ctx.from.id;
    
    quizData[userId] = { 
        current: 1, 
        score: 0, 
        question: generateQuestion(),
        startTime: Date.now() 
    };
    
    const q = quizData[userId];
    await ctx.editMessageText(
      `🧠 *MATH QUIZ IN PROGRESS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Player:* ${ctx.from.first_name}\n` +
      `📊 *Question:* ${q.current} / 10\n` +
      `✅ *Score:* ${q.score}\n\n` +
      `❓ *Solve:* \`${q.question.qText}\`\n` +
      `━━━━━━━━━━━━━━━━━━━━━━`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard(
          q.question.options.map(opt => [Markup.button.callback(`🔹 ${opt}`, `quiz_${opt}`)])
        )
      }
    );
  });

  bot.action(/quiz_(.+)/, async (ctx) => {
    const userId = ctx.from.id;
    if (!quizData[userId]) return ctx.answerCbQuery("❌ Session Expired!");

    const q = quizData[userId];
    const answer = Number(ctx.match[1]);

    if (answer === q.question.correct) {
      q.score++;
      await ctx.answerCbQuery("✅ Correct Answer!");
    } else {
      await ctx.answerCbQuery(`❌ Wrong! It was ${q.question.correct}`);
    }

    if (q.current >= 10) {
      // GAME FINISHED - PRO SCOREBOARD
      const timeTaken = Math.floor((Date.now() - q.startTime) / 1000);
      const accuracy = (q.score / 10) * 100;
      let rank = q.score > 8 ? "🏆 Legend" : q.score > 5 ? "🎖️ Pro" : "👶 Rookie";

      const finishMsg = await ctx.editMessageText(
        `🏁 *GAME OVER - SCOREBOARD* 🏁\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Player:* ${ctx.from.first_name}\n` +
        `🏅 *Rank:* ${rank}\n\n` +
        `✅ *Correct:* ${q.score}\n` +
        `❌ *Wrong:* ${10 - q.score}\n` +
        `🎯 *Accuracy:* ${accuracy}%\n` +
        `⏱️ *Time:* ${timeTaken}s\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `This result will auto-delete in 5 mins.`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([[Markup.button.callback("🔄 Play Again", "start_math_quiz")]])
        }
      );

      // Auto delete results after 5 mins
      setTimeout(() => {
        ctx.deleteMessage(finishMsg.message_id).catch(() => {});
      }, 300000);

      delete quizData[userId];
    } else {
      q.current++;
      q.question = generateQuestion();
      await ctx.editMessageText(
        `🧠 *MATH QUIZ IN PROGRESS*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Player:* ${ctx.from.first_name}\n` +
        `📊 *Question:* ${q.current} / 10\n` +
        `✅ *Score:* ${q.score}\n\n` +
        `❓ *Solve:* \`${q.question.qText}\`\n` +
        `━━━━━━━━━━━━━━━━━━━━━━`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard(
            q.question.options.map(opt => [Markup.button.callback(`🔹 ${opt}`, `quiz_${opt}`)])
          )
        }
      );
    }
  });
};
