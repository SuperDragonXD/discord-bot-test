console.log("Starting 'deploy-commands.js'...");
console.log('Started refreshing application (/) commands.');

const fs = require("node:fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, guildId } = require("./config.json");

const dotenv = require("dotenv");
dotenv.config();

const token = process.env.DISCORD_TOKEN;

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);
    console.log(`Loading '/commands/${file}'`);
    commands.push(command.data.toJSON());
  } catch (error) {
    console.error(`Error loading '/commands/${file}': ${error}`);
  }
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
