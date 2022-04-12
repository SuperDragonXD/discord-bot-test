const { SlashCommandBuilder } = require("@discordjs/builders");

const { MessageActionRow, MessageButton } = require("discord.js");

const button = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("verify-start")
    .setLabel("Start verifing")
    .setStyle("SUCCESS"),
  new MessageButton()
    .setURL("https://community.fandom.com/wiki/Discord")
    .setLabel("Learn more about this server")
    .setStyle("LINK")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verifies yourself"),
  async execute(interaction) {
    await interaction.reply({
      content:
        "Welcome to the official Fandom/Gamepedia Discord server. Read <#962357756789161994> first, then verify yourself by clicking the button below.",
      components: [button],
      // ephemeral: true
    });
  },
};
