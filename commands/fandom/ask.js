const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription(
      "Tells the user to ask a question directly, instead of asking if it's okay to ask"
    ),

  async execute(interaction) {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL("https://dontasktoask.com/")
        .setLabel("Don't ask to ask; just ask!")
        .setStyle("LINK")
    );

    await interaction.reply({
      content:
        "Please don't ask if it's okay to ask questions, or ask if someone knows something. Instead, directly ask your question; someone in this channel can help soon.",
      components: [button],
    });
  },
};
