const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("adoption")
    .setDescription("Tells a user on how to adopt a wiki"),
  async execute(interaction) {
    const sent = await interaction.reply(
      "Found a dead wiki"
    );
  },
};
