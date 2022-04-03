const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Restarts the bot.'),
  async execute(interaction) {
    await interaction.reply('Restarting...');
    await console.info('Bot is now restarting.');
    await process.exit();
  },
};
