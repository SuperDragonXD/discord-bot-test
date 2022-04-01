const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cache")
    .setDescription("Tells a user to bypass their cache.")
    .addStringOption((option) =>
      option
        .setName("purge")
        .setDescription(
          "Whether to tell the user to purge the page cache instead."
        )
    ),
  async execute(interaction) {
    const isPurge = interaction.options.getString("purge");
    let button;

    if (isPurge) {
      button = new MessageActionRow().addComponents(
        new MessageButton()
          .setURL("https://c.fandom.com/wiki/Help:Purge")
          .setLabel("Purging a page's cache.")
          .setStyle("LINK")
      );

      let reply =
        "If a page is not updating (like templates not showing up or related), you should purge the page's cache. See the linked help page on how to do that.";

      await interaction.reply({ content: reply, components: [button] });
    } else {
      button = new MessageActionRow().addComponents(
        new MessageButton()
          .setURL("https://c.fandom.com/wiki/Help:Bypass your cache")
          .setLabel("How to bypass your cache")
          .setStyle("LINK")
      );

      let reply =
        "Are your CSS or JS changes not showing up? Or changes are not showing/don't look right? It's likely a cache issue.\n\nPress `Shift + F5` or `Crtl + Shift + R`, or see the linked help page.";

      await interaction.reply({ content: reply, components: [button] });
    }
  },
};
