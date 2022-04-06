/*
* index.js
* Main file of the bot
*/

// |-| Start console.log
// Useful for debugging purposes :)
console.log('Starting \'index.js\'...')

// |-| Dependencies
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

// |-| Token
const dotenv = require('dotenv');
dotenv.config();
const { token } = process.env.DISCORD_TOKEN;

// |-| Init Client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    // The below is important, I should remember when I create another bot
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

// |-| Command loader
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`Loading command '${file}'`);
  client.commands.set(command.data.name, command);
}

// |-| Command handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// |-| Event loader & handler
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  console.log(`Loading event '${file}'`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// |-| Login
client.login(token);
