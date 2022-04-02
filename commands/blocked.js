const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blocked")
    .setDescription("Gives information on what to do when you are blocked"),
  async execute(interaction) {
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL("https://c.fandom.com/wiki/Help:I_have_been_blocked")
        .setLabel("General help page")
        .setStyle("LINK"),
      new MessageButton()
        .setURL(
          "https://support.fandom.com/hc/en-us/requests/new?ticket_form_id=360000931094&tf_360017834073=__dc.my_account_is_blocked__&tf_1500002786382=fandom_block_global"
        )
        .setLabel("I'm globally blocked")
        .setStyle("LINK"),

      new MessageButton()
        .setURL(
          "https://support.fandom.com/hc/en-us/requests/new?ticket_form_id=360000931094&tf_360017834073=__dc.my_account_is_blocked__&tf_1500002786382=fandom_block_local"
        )
        .setLabel("I'm locally blocked")
        .setStyle("LINK")
    );
    // https://support.fandom.com/hc/en-us/requests/new?ticket_form_id=360000931094&tf_360017834073=__dc.my_account_is_blocked__

    await interaction.reply({
      content: "Blocked? Don't panic! See the linked pages for information on what to do. Note: Do __not__ create a seperate account, that is considered [sockpuppetry](https://c.fandom.com/Help:Sockpuppetry). Instead, follow the instructions in the linked help page.",
      components: [button]
    });
  },
};
