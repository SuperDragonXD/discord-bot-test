const got = require("got");

async function getUserId(username) {
  try {
    const response = await got("https://community.fandom.com/api.php", {
      searchParams: {
        action: "query",
        list: "users",
        ususers: username,
        format: "json",
      },
    }).json();

    return response.query.users[0] && response.query.users[0].userid;
  } catch (e) {
    console.log(e);
    return "";
  }
}

async function getMastheadDiscord(userId) {
  try {
    return await got(
      `https://services.fandom.com/user-attribute/user/${userId}/attr/discordHandle`,
      {
        headers: {
          accept: "*/*",
        },
      }
    ).json();
  } catch (e) {
    console.log(e);
    return "";
  }
}

const { MessageActionRow, MessageButton } = require("discord.js");

const button = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId("verify-start")
    .setLabel("Try again")
    .setStyle("PRIMARY")
);



module.exports = {
  name: "modalSubmit",
  async execute(modal) {
    if (modal.customId === "verify-modal") {
      const catchpa = await modal.getTextInputValue("catchpa-input");

      if (catchpa.toLowerCase() !== "circle") {
        await modal.deferReply({ ephemeral: true });
        modal.followUp({
          content: "Catchpa test failed. Please try again",
          components: [button],
        });
      }

      const user = modal.getTextInputValue("verify-input") || "";

      const userId = (await getUserId(user)) || "";
      const verifyUser = await getMastheadDiscord(userId);

      if (!userId) {
        await modal.reply({
          content: "Error: No username provided",
          components: [button],
          ephemeral: true,
        });
      }
      if (verifyUser.value !== modal.user.tag) {
        await modal.deferReply({ ephermeral: true });
        modal.followUp({
          content: `The username and tag in the masthead do not match the username and tag of the message author. Use <https://community.fandom.com/wiki/Special:VerifyUser/${encodeURIComponent(
            user
          )}?user=${encodeURIComponent(modal.user.username)}&tag=${
            modal.user.discriminator
          }&c=!member&ch=lobby> to remedy this.`,
          components: [button],
        });
      }
      await modal.reply("Done");
    }
  },
};
