const { Markup } = require("telegraf");

const quizData = {};

function generateQuestion() {

  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;

  const correct = a + b;

  let options = [correct];

  while (options.length < 4) {

    let wrong =
      correct +
      Math.floor(Math.random() * 10) -
      5;

    if (
      wrong !== correct &&
      !options.includes(wrong)
    ) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  return {
    question: `${a} + ${b} = ?`,
    correct,
    options
  };
}

function getQuizText(userId) {

  const q = quizData[userId];

  return `
🧠 MATH QUIZ

📊 Question: ${q.current}/10

✅ Score: ${q.score}

❓ ${q.question.question}
`;
}

module.exports = (bot) => {

  bot.action(
    "start_math_quiz",
    async (ctx) => {

      await ctx.answerCbQuery();

      const userId = ctx.from.id;

      quizData[userId] = {
        current: 1,
        score: 0,
        question: generateQuestion()
      };

      const q = quizData[userId];

      await ctx.editMessageText(
        getQuizText(userId),
        Markup.inlineKeyboard(
          q.question.options.map(
            (opt) => [
              Markup.button.callback(
                String(opt),
                `quiz_${opt}`
              )
            ]
          )
        )
      );

    }
  );

  bot.action(
    /quiz_(.+)/,
    async (ctx) => {

      const userId = ctx.from.id;

      if (!quizData[userId]) {
        return ctx.answerCbQuery(
          "Game expired"
        );
      }

      const q = quizData[userId];

      const answer =
        Number(ctx.match[1]);

      if (
        answer ===
        q.question.correct
      ) {
        q.score++;
        await ctx.answerCbQuery(
          "✅ Correct!"
        );
      } else {
        await ctx.answerCbQuery(
          "❌ Wrong!"
        );
      }

      if (q.current >= 10) {

        await ctx.editMessageText(
`🏆 QUIZ FINISHED

👤 ${ctx.from.first_name}

✅ Correct: ${q.score}
❌ Wrong: ${10 - q.score}

🎯 Score: ${q.score}/10`
        );

        delete quizData[userId];

        return;
      }

      q.current++;
      q.question = generateQuestion();

      await ctx.editMessageText(
        getQuizText(userId),
        Markup.inlineKeyboard(
          q.question.options.map(
            (opt) => [
              Markup.button.callback(
                String(opt),
                `quiz_${opt}`
              )
            ]
          )
        )
      );

    }
  );

};
