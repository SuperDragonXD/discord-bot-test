/*
 * index.js
 * Main file of the bot
 */

// |-| Start console.log
// Useful for debugging purposes :)
console.log("Starting 'index.js'...");

// |-| Dependencies
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

// |-| config.json
const { prefix, allowed_users } = require("./config.json");

// |-| Token
const dotenv = require("dotenv");
dotenv.config();
const { token } = process.env.DISCORD_TOKEN;

// |-| Init Client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    // Join/leave events
    Intents.FLAGS.GUILD_MEMBERS,
    // In case we want to assign roles when users join or leave VC
    Intents.FLAGS.GUILD_VOICE_STATES,
    // Commands and moderation
    Intents.FLAGS.GUILD_MESSAGES,
    // Listening for reactions as commands
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    // Listening for commands in DM
    Intents.FLAGS.DIRECT_MESSAGES,
    // Reactions on commands like !help
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

// |-| Command loader
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");

const restrictedCmds = [],
  disabledCmds = [];

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    console.log(`Loading command '${file}' in folder '${folder}'`);
    client.commands.set(command.data.name, command);
    if (command.restricted) restrictedCmds.push(command.data.name);
    if (command.disabled) disabledCmds.push(command.data.name);
  }
}

// |-| Command handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  // Checks
  if (disabledCmds.includes(interaction.commandName)) {
    await interaction.reply({
      content: "This command is disabled!",
      ephemeral: true,
    });
  }

  if (
    restrictedCmds.includes(interaction.commandName) &&
    interaction.user.username
  ) {
    await interaction.reply({
      content: "This command is restricted!",
      ephemeral: true,
    });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// |-| Event loader & handler
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  console.log(`Loading event '${file}'`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// |-| Debug
client.on("debug", console.log).on("warn", console.log);

// |-| Server
const keepAlive = require("./server");
keepAlive();

// |-| Discord-modals
const discordModals = require("discord-modals");
discordModals(client);

// |-| Login
client.login(token);
