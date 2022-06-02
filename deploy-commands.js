function deployCommands() {
  console.log("Started refreshing application (/) commands.");

  // |-| Dependencies
  const fs = require("node:fs");
  const { SlashCommandBuilder } = require("@discordjs/builders");
  const { REST } = require("@discordjs/rest");
  const { Routes } = require("discord-api-types/v9");

  // |-| Client
  const clientId = "958986417709674536";
  const guildId = "958985813826355220";

  // |-| Token
  const dotenv = require("dotenv");
  dotenv.config();
  const token = process.env.DISCORD_TOKEN;

  // |-| Command loader
  const commands = [];
  const commandFolders = fs.readdirSync("./commands");
  //  .filter((file) => file.endsWith('.js'));

  // |-| Command deployment
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      try {
        const command = require(`./commands/${folder}/${file}`);
        console.log(`Deploying '/commands/${folder}/${file}'`);
        commands.push(command.data.toJSON());
      } catch (error) {
        console.error(
          `Error deploying '/commands/${folder}/${file}': ${error}`
        );
      }
    }
  }
  // |-| REST
  console.log("Setting up REST version 9");
  const rest = new REST({ version: "9" }).setToken(token);

  // |-| Final init
  console.log("Registering application commands... (this may take some time)");
  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}

if (require.main === module) {
  deployCommands();
}

module.exports = deployCommands;
