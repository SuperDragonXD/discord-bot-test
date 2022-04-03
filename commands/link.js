const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Links to a Fandom wiki.')
    .addStringOption((option) =>
      option.setName('page').setDescription('The page').setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('interwiki')
        .setDescription(
          'Optional interwiki link. The end colon (":") is not needed.'
        )
    )
    .addStringOption((option) =>
      option
        .setName('action')
        .setDescription('The page action')
        .addChoice('Edit', 'edit')
        .addChoice('History', 'hist')
        .addChoice('Purge', 'prge')
        .addChoice('Page information', 'info')
    ),
  async execute(interaction) {
    const inputLink = interaction.options.getString('page') || '';
    let interwikiLink = interaction.options.getString('interwiki') || '';
    const actionLink = interaction.options.getString('action');

    interwikiLink = interwikiLink ? interwikiLink + ':' : '';

    let pageAction = '';

    switch (actionLink) {
      case 'edit': {
        pageAction = '?action=edit';
        break;
      }
      case 'hist': {
        pageAction = '?action=history';
        break;
      }
      case 'prge': {
        pageAction = '?action=purge';
        break;
      }
      case 'info': {
        pageAction = '?action=info';
        break;
      }
    }

    await interaction.reply(
      `https://c.fandom.com/wiki/${interwikiLink}${inputLink}${pageAction}`
    );
  },
};
