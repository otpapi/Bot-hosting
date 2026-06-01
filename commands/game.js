const { Markup } = require("telegraf");

// Players ka data store karne ke liye
const quizData = {};

// Sawal banane ka function
function generateQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const correct = a + b;
  let options = [correct];
  while (options.length < 4) {
    let wrong = correct + Math.floor(Math.random() * 10) - 5;
    if (wrong !== correct && !options.includes(wrong)) options.push(wrong);
  }
  options.sort(() => Math.random() - 0.5);
  return { question: `${a} + ${b} = ?`, correct, options };
}

module.exports = (bot) => {
  
  // 1. /game command (Menu dikhane ke liye)
  bot.command("game", async (ctx) => {
    try {
      console.log("Game command received"); // Debugging
      await ctx.reply(
        `🎮 *SUPREME GAME CENTER*\n\nChoose a game below 👇`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard([
            [Markup.button.callback("🧠 Start Math Quiz", "start_math_quiz")]
          ])
        }
      );
    } catch (e) { console.error(e); }
  });

  // 2. Start Quiz Button Handler
  bot.action("start_math_quiz", async (ctx) => {
    try {
      console.log("Start Math Quiz button clicked!"); // Debugging
      await ctx.answerCbQuery();
      const userId = ctx.from.id;

      quizData[userId] = { current: 1, score: 0, question: generateQuestion() };
      const q = quizData[userId];

      await ctx.editMessageText(
        `🧠 *MATH QUIZ*\n📊 Question: 1/10\n✅ Score: 0\n\n❓ Sawal: ${q.question.question}`,
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard(
            q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
          )
        }
      );
    } catch (e) { console.error("Action Error:", e); }
  });

  // 3. Quiz Options Handler
  bot.action(/quiz_(.+)/, async (ctx) => {
    try {
      const userId = ctx.from.id;
      if (!quizData[userId]) return ctx.answerCbQuery("❌ Session Expired! Phir se /game likho.");

      const q = quizData[userId];
      const answer = Number(ctx.match[1]);

      if (answer === q.question.correct) {
        q.score++;
        await ctx.answerCbQuery("✅ Correct!");
      } else {
        await ctx.answerCbQuery("❌ Wrong!");
      }

      if (q.current >= 10) {
        await ctx.editMessageText(
          `🏆 *QUIZ FINISHED*\n✅ Correct: ${q.score}\n🎯 Score: ${q.score}/10`,
          { parse_mode: "Markdown" }
        );
        delete quizData[userId];
      } else {
        q.current++;
        q.question = generateQuestion();
        await ctx.editMessageText(
          `🧠 *MATH QUIZ*\n📊 Question: ${q.current}/10\n✅ Score: ${q.score}\n\n❓ Sawal: ${q.question.question}`,
          {
            parse_mode: "Markdown",
            ...Markup.inlineKeyboard(
              q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
            )
          }
        );
      }
    } catch (e) { console.error("Option Error:", e); }
  });
};
