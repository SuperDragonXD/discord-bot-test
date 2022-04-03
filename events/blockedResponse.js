module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    if (!interaction.isButton() || !interaction.customId.startsWith('blocked-')) {
      return;
    }
    
    switch (interaction.customId) {
      case 'blocked-global':
        interaction.reply('Blocked')
    }
  },
};
