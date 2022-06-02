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

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    console.log(`Loading command '${file}' in folder '${folder}'`);
    client.commands.set(command.data.name, command);
  }
}



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

// |-| Login
client.login(token);
