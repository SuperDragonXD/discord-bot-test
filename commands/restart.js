const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the bot'),
	async execute(interaction) {
    await interaction.reply("Restarting...")
    await console.log("Bot is now restarting, from user command.")
	  await process.exit();
	}
}