const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const baseUrl =
  'https://support.fandom.com/hc/en-us/requests/new?ticket_form_id=';

const baseSentence = 'Contact staff:';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff')
    .setDescription(
      'Posts a link to create a ticket to contact Fandom or Gampedia staff'
    )
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('Optional category in the ticket')
        .addChoice('Account Help', 'account_help')
        .addChoice('Wiki Changes', 'wiki_changes')
        .addChoice('Problem', 'problem')
        .addChoice('Protection', 'protection')
        .addChoice('Other', 'other')
        .addChoice('Bad Ad', 'bad_ad')
        .addChoice('Spam/Vandal', 'spam_vandal')
    )
    .addStringOption((option) =>
      option
        .setName('support_site')
        .setDescription(
          "Goes to Fandom/Gamepedia's support site, instead of directly creating a ticket."
        )
        .addChoice('Yes', 'yes')
    ),
  async execute(interaction) {
    const cat = interaction.options.getString('category');
    let button;

    const supportSite = interaction.options.getString('support_site');

    if (supportSite) {
      button = new MessageActionRow().addComponents(
        new MessageButton()
          .setURL('https://support.fandom.com')
          .setLabel('Fandom')
          .setStyle('LINK'),
        new MessageButton()
          .setURL('https://support.gamepedia.com')
          .setLabel('Gampedia')
          .setStyle('LINK')
      );
      await interaction.reply({
        content: 'View the support site of Fandom/Gamepedia:',
        components: [button],
      });
    }

    switch (cat) {
      case 'account_help':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(baseUrl + '360000931094')
            .setLabel('Account help')
            .setStyle('LINK')
        );
        await interaction.reply({
          content: baseSentence,
          components: [button],
        });
        break;

      case 'wiki_changes':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(baseUrl + '360000931354')
            .setLabel('Wiki changes')
            .setStyle('LINK')
        );
        await interaction.reply({
          content: baseSentence,
          components: [button],
        });
        break;

      case 'problem':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(baseUrl + '360000940393')
            .setLabel('Problem')
            .setStyle('LINK')
        );
        await interaction.reply({
          content: baseSentence,
          components: [button],
        });
        break;

      case 'protection':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(baseUrl + '360000948854')
            .setLabel('Protection')
            .setStyle('LINK')
        );

        await interaction.reply({
          content: baseSentence,
          components: [button],
        });
        break;

      case 'other':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL(baseUrl + '360000956114')
            .setLabel('Other')
            .setStyle('LINK')
        );
        await interaction.reply({
          content: baseSentence,
          components: [button],
        });
        break;

      case 'bad_ad':
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL('https://c.fandom.com/wiki/Help:Bad_advertisements')
            .setLabel('Reporting bad advertisements')
            .setStyle('LINK')
        );
        await interaction.reply({
          content:
            'Found a bad advertisement? See the linked help page for additional information on what to do.',
          components: [button],
        });
        break;

      case 'spam_vandal':
        await interaction.reply(
          'If you found any vandalism/spam, please go to <#866305196573327370>.\nYou can also see the [SOAP Wiki](<https://soap.fandom.com>) for additional information on reporting spam.'
        );
        break;

      default:
        button = new MessageActionRow().addComponents(
          new MessageButton()
            .setURL('https://support.fandom.com/hc/en-us/requests/new')
            .setLabel('Fandom')
            .setStyle('LINK'),
          new MessageButton()
            .setURL('https://support.gamepedia.com/hc/en-us/requests/new')
            .setLabel('Gamepedia')
            .setStyle('LINK')
        );

        await interaction.reply({
          content: 'Contact Fandom or Gamepedia by creating a support ticket:',
          components: [button],
        });
    }
  },
};
