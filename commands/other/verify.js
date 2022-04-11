const { SlashCommandBuilder } = require("@discordjs/builders");

const { MessageActionRow, MessageButton } = require("discord.js");

const button = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("verify-start")
    .setLabel("Start verifing")
    .setStyle("PRIMARY")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verifies yourself"),
  async execute(interaction) {
    await interaction.reply({
      content:
        "Welcome to the Fandom/Gamepedia verification process. Read <#962357756789161994> first.",
      components: [button],
      ephemeral: true
    });
  },
};
