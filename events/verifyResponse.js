const { Modal, TextInputComponent, showModal } = require("discord-modals");
const { getUserId, getMastheadDiscord } = require("../shared/verifier.js");

const modal = new Modal()
  .setCustomId("verify-modal")
  .setTitle("User verification")
  .addComponents(
    new TextInputComponent()
      .setCustomId("verify-input")
      .setLabel("Enter your Fandom username")
      .setStyle("SHORT")
      .setMinLength(1)
      .setPlaceholder("e.g. Example")
      .setRequired(true)
  );

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if (interaction.customId == "verify-start") {
      const user = interaction.user.username;
      const discord = getMastheadDiscord(getUserId(user));
      const sameDiscordUsername =
        discord == user + interaction.user.discriminator;
      
      const member = interaction.member;
      if (
        member.roles.cache.some((role) => role.name === "962220822653726770")
      ) {
        interaction.reply({
          content: "You are already verified. If you changed your username, or this Discord account is no longer under the original username, please reverify.",
          ephemeral: true,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId("verify-start")
                .setLabel("Reverify")
                .setStyle("SECONDARY")
            ),
          ],
        });
      }

      if (sameDiscordUsername) {
        interaction.reply({
          content: `You are automatically verified as Fandom user \`${user}\`; the \`@Verified\` role has been added. Add more roles in <#963259259842347089>.`,
          ephemeral: true,
        });
      } else {
        showModal(modal, {
          client: interaction.client,
          interaction: interaction,
        });
      }
    }
  },
};
