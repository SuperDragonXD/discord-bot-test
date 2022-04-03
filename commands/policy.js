const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('policy')
    .setDescription("View Fandom' policies.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName('tou')
        .setDescription("Send's a link to Fandom's Terms of Use")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('privacy')
        .setDescription("Send's a link to Fandom's Privacy Policy")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('creation')
        .setDescription("Send's a link to Fandom's Community Creation Policy")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('licensing')
        .setDescription("Send's a link to Fandom's Licensing policy")
    ),
  async execute(interaction) {
    let policyType = interaction.options.getSubcommand();

    switch (policyType) {
      case 'tou':
        await interaction.reply(
          "Here is a link to [Fandom's Terms of Use](https://fandom.com/terms-of-use). Notably, you must be at least [13 years old](https://fandom.com/terms-of-use#Membership)."
        );
        return;

      case 'privacy':
        await interaction.reply(
          "Here is a link to [Fandom's Privacy Policy](https://fandom.com/privacy-policy)."
        );
        return;

      case 'licensing':
        await interaction.reply(
          'Most wikis in Fandom are usually in [CC-BY-SA](https://creativecommons.org/licenses/by-sa/3.0/) license, although there is exceptions. View the [full license policy here](https://fandom.com/licensing).'
        );
        return;

      case 'creation':
        await interaction.reply(
          'View the [full community creation policy here](https://fandom.com/community-creation-policy).\nIn simple terms, wikis should be freely licensed, publicly available, and free of abuse.'
        );
        return;

      default:
        await interaction.reply('Error: No subcommand specified.');
        return;
    }
  },
};
