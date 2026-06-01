// commands/mathquiz.js
const { Markup } = require("telegraf");
const quizData = {}; // Ye data sirf is file me rahega

function generateQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const correct = a + b;
  let options = [correct, correct + 2, correct - 1, correct + 5].sort(() => Math.random() - 0.5);
  return { question: `${a} + ${b} = ?`, correct, options };
}

module.exports = (bot) => {
  // Game Start handler
  bot.action("start_math_quiz", async (ctx) => {
    await ctx.answerCbQuery();
    const userId = ctx.from.id;
    quizData[userId] = { current: 1, score: 0, question: generateQuestion() };
    const q = quizData[userId];

    await ctx.editMessageText(
      `🧠 *MATH QUIZ*\n📊 Ques: 1/10\n❓ ${q.question.question}`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard(
          q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
        )
      }
    );
  });

  // Answer handler
  bot.action(/quiz_(.+)/, async (ctx) => {
    const userId = ctx.from.id;
    if (!quizData[userId]) return ctx.answerCbQuery("Expired!");

    const q = quizData[userId];
    const answer = Number(ctx.match[1]);

    if (answer === q.question.correct) {
      q.score++;
      await ctx.answerCbQuery("✅ Correct!");
    } else {
      await ctx.answerCbQuery("❌ Wrong!");
    }

    if (q.current >= 10) {
      await ctx.editMessageText(`🏆 *FINISH*\nScore: ${q.score}/10`);
      delete quizData[userId];
    } else {
      q.current++;
      q.question = generateQuestion();
      await ctx.editMessageText(
        `🧠 *MATH QUIZ*\n📊 Ques: ${q.current}/10\n❓ ${q.question.question}`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard(
            q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
          )
        }
      );
    }
  });
};
