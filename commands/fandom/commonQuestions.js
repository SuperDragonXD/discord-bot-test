const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("question")
    .setDescription(
      "Outputs "
    ),

  async execute(interaction) {
    await interaction.reply("q  ")
  },
};
  