const { SlashCommandBuilder } = require("@discordjs/builders");
const os = require("os");



module.exports = {
  data: new SlashCommandBuilder()
    .setName("os")
    .setDescription("Gives system information"),
  async execute(interaction) {
    await interaction.reply(`**System info:**
IP Address: REDACTED
Home directory: /home/
OS: ${os.type()}
${os.type()} version: ${os.version()}
System architechture: ${os.arch()}
`);
  },
};
