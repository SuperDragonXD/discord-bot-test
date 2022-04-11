const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notzendesk")
    .setDescription(
      "Tells the user that this server is not a shortcut to zendesk."
    )
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention a user about this ")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("target");

    const reply = user ? `, ${user}` : "";
    await interaction.reply(
      `Keep in ming that this server is **not** a shortcut to zendesk (Fandom Support)${reply}. Even though Fandom staff are here and might reply, it's better to contact staff through the [official contact form](https://support.fandom.com). (you can also use \`/staff\`)`
    );
  },
};
