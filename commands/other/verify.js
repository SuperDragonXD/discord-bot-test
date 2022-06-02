const { MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Shows the verify modal"),
  async execute(interaction) {
    const modal = new Modal().setCustomId("myModal").setTitle("My Modal");

    const favoriteColorInput = new TextInputComponent()
      .setCustomId("favoriteColorInput")
      .setLabel("What's your favorite color?")
      .setStyle("SHORT");
    const hobbiesInput = new TextInputComponent()
      .setCustomId("hobbiesInput")
      .setStyle("PARAGRAPH");

    const firstActionRow = new MessageActionRow().addComponents(
      favoriteColorInput
    );
    const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  
  },
};
