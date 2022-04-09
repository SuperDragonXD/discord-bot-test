const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ccr')
    .setDescription('Posts a link to Community Central Requests.'),
  async execute(interaction) {
    const sent = await interaction.reply(
      'If you want to report something on Community Central, or request someone to edit a protected page, head over to Community Central Requests: https://discord.gg/Fuer8KX'
    );
  },
};
