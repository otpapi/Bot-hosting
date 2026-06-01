const { Markup } = require("telegraf");

// Players ka data store karne ke liye
const quizData = {};

// Naya sawal banane ka function
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

// Quiz ka text format
function getQuizText(userId, ctx) {
  const q = quizData[userId];
  return `🧠 *MATH QUIZ*\n━━━━━━━━━━━━━━\n👤 *Player:* ${ctx.from.first_name}\n📊 *Question:* ${q.current}/10\n✅ *Score:* ${q.score}\n━━━━━━━━━━━━━━\n❓ *Sawal:* ${q.question.question}`;
}

module.exports = (bot) => {

  // Button Listener: Jab "Start Math Quiz" dabaye
  bot.action("start_math_quiz", async (ctx) => {
    try {
      await ctx.answerCbQuery(); // Spinner hatao
      const userId = ctx.from.id;

      quizData[userId] = {
        current: 1,
        score: 0,
        question: generateQuestion()
      };

      const q = quizData[userId];

      await ctx.editMessageText(
        getQuizText(userId, ctx),
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard(
            q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
          )
        }
      );
    } catch (err) {
      console.error("Math Quiz Start Error:", err);
    }
  });

  // Button Listener: Jab options par click kare
  bot.action(/quiz_(.+)/, async (ctx) => {
    try {
      const userId = ctx.from.id;
      
      if (!quizData[userId]) {
        return ctx.answerCbQuery("❌ Session Expired! Type /game again.");
      }

      const q = quizData[userId];
      const answer = Number(ctx.match[1]);

      if (answer === q.question.correct) {
        q.score++;
        await ctx.answerCbQuery("✅ Sahi Jawab!");
      } else {
        await ctx.answerCbQuery(`❌ Galat! Sahi: ${q.question.correct}`);
      }

      if (q.current >= 10) {
        await ctx.editMessageText(
          `🏆 *QUIZ FINISHED*\n━━━━━━━━━━━━━━\n👤 *Player:* ${ctx.from.first_name}\n\n✅ *Correct:* ${q.score}\n❌ *Wrong:* ${10 - q.score}\n🎯 *Final Score:* ${q.score}/10\n━━━━━━━━━━━━━━\nType /game to play again!`,
          { parse_mode: "Markdown" }
        );
        delete quizData[userId];
        return;
      }

      q.current++;
      q.question = generateQuestion();

      await ctx.editMessageText(
        getQuizText(userId, ctx),
        {
          parse_mode: "Markdown",
          ...Markup.inlineKeyboard(
            q.question.options.map(opt => [Markup.button.callback(String(opt), `quiz_${opt}`)])
          )
        }
      );
    } catch (err) {
      console.error("Quiz Action Error:", err);
    }
  });
};
