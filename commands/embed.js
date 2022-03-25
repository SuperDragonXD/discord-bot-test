const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Creates an embed')
    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("Embed title")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("desc")
        .setDescription("Embed description")
    )
    .addStringOption(option =>
      option
        .setName("color")
        .setDescription("Embed color")
    )
    .addStringOption(option =>
      option
        .setName("link")
        .setDescription("Embed link")
    )
  ,
  async execute(interaction) {
    let color = interaction.options.getString('color')
    let title = interaction.options.getString('title')
    let desc = interaction.options.getString('desc')
    let link = interaction.options.getString('link')
    
    if (!color) {
      color = '#ffffff'
    }
    if (!desc) {
      desc = ""
    }
    if (!link) {
      link = ""
    }
  
  
    
		const embed = new MessageEmbed()
			.setColor(color)
			.setTitle(title)
			.setURL(link)
			.setDescription(desc)
    
    await interaction.reply({ embeds: [embed] });
	}
}