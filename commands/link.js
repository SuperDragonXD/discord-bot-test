const { SlashCommandBuilder } = require('@discordjs/builders');

function linker(page, interwiki, action, display, params) {
  let domainName = '';
  interwiki = interwiki ? interwiki : ''
  
  ;

  if (action) {
    params = params ? '&' + params : '';
  } else {
    params = params ? '?' + params : '';
  }

  const actionPrefix = '?action=';
  switch (action) {
    case 'edit':
      action = 'edit';
      break;

    case 'hist':
      action = 'history';
      break;

    case 'prge':
      action = 'purge';
      break;

    case 'info':
      action = 'info';
      break;

    default:
      action = null;
  }

  action = action ? `${actionPrefix}${action}` : '';

  switch (interwiki) {
    case '':
    case 'w:':
    case 'w:c:c:':
    case 'w:c:community':
    case 'meta:':
      domainName = 'https://c.fandom.com/wiki/';
      break;

    case 'wikipedia:':
    case 'wp:':
      domainName = 'https://en.wikipedia.org/wiki/';
      break;

    case 'mw:':
    case 'mediawiki:':
      domainName = 'https://mediawiki.org/wiki/';
      break;

    default:
      // TODO: Splice string
      domainName = 'https://c.fandom.com/' + interwiki;
  }

  let finalLink = `${domainName}${page}${action}${params}`;

  finalLink = display ? `[${display}](${finalLink})` : finalLink;

  return finalLink;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Links to a Fandom wiki.')
    .addStringOption((option) =>
      option.setName('page').setDescription('The page').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('display').setDescription('Display text')
    )
    .addStringOption((option) =>
      option.setName('interwiki').setDescription('Optional interwiki link.')
    )
    .addStringOption((option) =>
      option
        .setName('action')
        .setDescription('The page action')
        .addChoice('Edit', 'edit')
        .addChoice('History', 'hist')
        .addChoice('Purge', 'prge')
        .addChoice('Page information', 'info')
    )

    .addStringOption((option) =>
      option
        .setName('params')
        .setDescription('Additional URL parameters. No need to put a "&" or"?"')
    ),
  async execute(interaction) {
    const page = interaction.options.getString('page');
    const interwiki = interaction.options.getString('interwiki');
    const action = interaction.options.getString('action');
    const params = interaction.options.getString('params');
    const display = interaction.options.getString('display');

    const message = await interaction.reply({
      content: linker(page, interwiki, action, display, params),
      fetchReply: true,
    });

    await message.react('❌');
    const filter = (reaction, reactor) =>
      reactor.id === message.author.id && reaction.emoji.name === '❌';

    message
      .awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '❌') {
			message.delete();
		}
	})
	.catch();
  },
};
