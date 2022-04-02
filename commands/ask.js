const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription(
      "Tells the user to ask a question directly, instead of asking if it's okay to ask"
    ),
  async execute(interaction) {
    await interaction.reply(
      "[Please don't ask if it's okay to ask questions, or ask if someone knows something](https://dontasktoask.com/). Instead, directly ask your question; someone in this channel can help soon."
    );
  },
};
