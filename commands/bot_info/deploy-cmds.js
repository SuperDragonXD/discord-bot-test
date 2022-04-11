const { SlashCommandBuilder } = require("@discordjs/builders");
const redeployCommands = require("../../deploy-commands.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("redeploy")
    .setDescription("Redeploys / commands"),
  async execute(interaction) {
    console.log("User redeployed application commands");
    await interaction.reply("Redeploying slash commands...");
    // await interaction.deferReply();
    try {
      await redeployCommands();
      await interaction.editReply(
        "Succesfully deployed commands. Restarting..."
      );
      await console.info(
        "Successfully deployed application commands. Restarting bot..."
      );
      await process.exit();
    } catch (e) {
      await interaction.editReply("Failed to redeploy slash commands");
      console.log(e);
    }
  },
};
