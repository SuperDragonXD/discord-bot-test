const { SlashCommandBuilder } = require('@discordjs/builders');
const quiz = require('./quiz.json');

module.exports = {
  data: new SlashCommandBuilder().setName('quiz').setDescription('quiz'),
  async execute(interaction) {
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = (response) => {
      return item.answers.some(
        (answer) => answer.toLowerCase() === response.content.toLowerCase()
      );
    };

    await interaction.reply(item.question, { fetchReply: true }).then(() => {
      interaction.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 30000,
          errors: ['time'],
        })
        .then((collected) => {
          interaction.followUp(
            `${collected.first().author} got the correct answer!`
          );
        })
        .catch((collected) => {
          interaction.followUp('Looks like nobody got the answer this time.');
        });
    });
  },
};
