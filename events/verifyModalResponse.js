const { getUserId, getMastheadDiscord } = require("../shared/verifier.js");
const { MessageActionRow, MessageButton } = require("discord.js");

// Main
module.exports = {
  name: "modalSubmit",
  async execute(modal) {
    const user =
      modal.getTextInputValue("verify-input").replace("!verify", "") || "";

    const userId = (await getUserId(user)) || "";
    const verifyUser = userId ? await getMastheadDiscord(userId) : "";

    console.log("User id: " + userId);
    console.log(`Discord tag of ${userId}: ${verifyUser}`);

    const tryAgainButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("verify-start")
        .setLabel("Try again")
        .setStyle("PRIMARY")
    );

    const addDiscordButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("verify-start")
        .setLabel("Try again")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setURL(
          `https://community.fandom.com/wiki/Special:VerifyUser/${encodeURIComponent(
            user
          )}?user=${encodeURIComponent(modal.user.username)}&tag=${
            modal.user.discriminator
          }&c=!member&ch=lobby`
        )
        .setLabel("Add this Discord tag to your profile")
        .setStyle("LINK")
    );

    if (modal.customId === "verify-modal") {
      const verifiedRole = "962220822653726770";

      if (userId == "") {
        await modal.deferReply({ ephemeral: true });
        modal.followUp({
          content: "That user does not exist.",
          components: [tryAgainButton],
        });
        console.log("User id is empty.");
      } else if (!verifyUser.value) {
        await modal.deferReply({ ephemeral: true });
        modal.followUp({
          content: `There is no Discord tag associated with the Fandom profile \`${user}\`. Please add ${modal.user} to your profile using the button below and try again.`,
          components: [addDiscordButton],
        });
        console.log("No discord tag in user");
      } else if (verifyUser.value !== modal.user.tag) {
        await modal.deferReply({ ephemeral: true });
        modal.followUp({
          content: `There is a Discord tag associated with the Fandom profile \`${user}\`, but does not match this Discord tag. Please add ${modal.user} to your profile using the button below and try again.`,
          components: [addDiscordButton],
        });
        console.log("Discord tag in profile does not match the provided user.");
      } else {
        await modal.deferReply({ ephemeral: true });
        await modal.followUp(
          `You are now verified as Fandom user \`${user}\`; the \`@Verified\` role has been added. Add more roles in <#963259259842347089>`
        );

        modal.user.roles.cache.add(role);

        console.log("Successfully verified.");
      }
    }
  },
};
