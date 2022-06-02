const { SlashCommandBuilder } = require("@discordjs/builders");
const redeployCommands = require("../../deploy-commands.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("redeploy")
    .setDescription("Redeploys / commands"),
  async execute(interaction) {
    console.log("User redeployed application commands");

    interaction.client.user.setPresence({
      activities: [{ name: "Redeploying commands" }],
      status: "dnd",
    });

    await interaction.reply("Redeploying slash commands...");

    try {
      await redeployCommands();
      
      await interaction.editReply(
        "Succesfully deployed commands. Restarting..."
      );
      await console.info(
        "Successfully deployed application commands. Restarting bot..."
      );
      
      interaction.client.user.setPresence({});
      await process.exit();
      
    } catch (e) {
      await interaction.editReply("Failed to redeploy slash commands");
      console.log(e);
    }
  },
};
