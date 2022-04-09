const { SlashCommandBuilder } = require('@discordjs/builders');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('runtime')
    .setDescription(
      'Shows the bot\'s runtime. Tip: You can also see it in "/os".'
    ),
  async execute(interaction) {
    await interaction.reply(`:arrow_double_up: System uptime: ${os.uptime()}s`);
  },
};
