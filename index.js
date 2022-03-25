const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

// .env setup and Token
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


// Commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(`Interaction details: "${interaction}"`)
  } catch (error) {
    console.error(`Failed to process interaction "${interaction}": \n` + error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Server setup
// Unneccessary if you are selfhosting this
const keepAlive = require("./server.js");
keepAlive();

client.login(token);
