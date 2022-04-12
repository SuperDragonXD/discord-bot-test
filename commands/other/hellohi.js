const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hellohi")
    .setDescription("Tells a user to go to a more appropriate channel"),
  async execute(interaction) {
    const sent = await interaction.reply(
      "#general or #random might be a better place to say hi"
    );
  },
};
