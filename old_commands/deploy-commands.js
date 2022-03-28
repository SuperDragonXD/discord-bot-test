const { SlashCommandBuilder } = require("@discordjs/builders");

const deploy = require("child_process").exec("cd ../ && node ./deploy-commands.js")


module.exports = {
  data: new SlashCommandBuilder()
		.setName('deploy')
		.setDescription('Redeploys commands'),
	async execute(interaction) {
    await interaction.reply("Deploying commamds...")
    
    
    await require("child_process").exec("cd ../ && node ./deploy-commands.js")

    
    await console.log(deploy)
    await console.log("Commands successfully deployed. Restarting bot...")
    await interaction.editReply("Sucessfully deployed commands. Restarting...")
	  await process.exit();
	}
}