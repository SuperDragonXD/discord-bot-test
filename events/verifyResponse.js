const { Modal, TextInputComponent, showModal } = require("discord-modals");

const modal = new Modal()
  .setCustomId("verify-modal")
  .setTitle("User verification")
  .addComponents(
    new TextInputComponent()
      .setCustomId("verify-input")
      .setLabel("Enter your Fandom username")
      .setStyle("SHORT")
      .setMinLength(1)
      .setMaxLength(4000)
      .setPlaceholder("e.g. Example")
      .setRequired(true)
  )
  .addComponents(
    new TextInputComponent()
      .setCustomId("catchpa-input")
      .setLabel("What is a shape with no sides?")
      .setStyle("SHORT")
      .setMinLength(6)
      .setMaxLength(6)
      .setPlaceholder("🔴")
      .setRequired(true)
  );

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (interaction.customId == "verify-start") {
      showModal(modal, {
        client: interaction.client,
        interaction: interaction,
      });
    }
  },
};
