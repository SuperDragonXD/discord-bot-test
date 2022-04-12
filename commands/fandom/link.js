const { SlashCommandBuilder } = require("@discordjs/builders");

function linker(page, interwiki, action, display, params) {
  let domainName = "";

  /*
  if (!interwiki) interwiki = '';
  if (!interwiki.slice(-1) == ':') interwiki =+ ':';
  */
  
  interwiki = interwiki ? (interwiki.slice(-1) == ":" ? interwiki : interwiki + ":") : "";

  if (action) {
    params = params ? "&" + params : "";
  } else {
    params = params ? "?" + params : "";
  }

  switch (action) {
    case "edit":
      action = "edit";
      break;

    case "hist":
      action = "history";
      break;

    case "prge":
      action = "purge";
      break;

    case "info":
      action = "info";
      break;

    default:
      action = null;
  }

  action = action ? `?action=${action}` : "";

  switch (interwiki) {
    case "":
    case "w:":
    case "w:c:c:":
    case "w:c:community":
    // case "meta:":
      domainName = "https://community.fandom.com/wiki/";
      break;

    case "wikipedia:":
    case "wp:":
      domainName = "https://en.wikipedia.org/wiki/";
      break;

    case "mediawiki:":
    case "mw:":
      domainName = "https://mediawiki.org/wiki/";
      break;

    case "miraheze:":
      domainName = "https://meta.meraheze.org/wiki/";
      break;

    default:
      domainName = "https://c.fandom.com/" + interwiki;
  }

  const generatedLink = `${domainName}${page}${action}${params}`;

  const finalLink = display ? `[${display}](${generatedLink})` : generatedLink;
  return finalLink;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Links to a Fandom wiki.")
    .addStringOption((option) =>
      option.setName("page").setDescription("The page").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("display").setDescription("Display text")
    )
    .addStringOption((option) =>
      option.setName("interwiki").setDescription("Optional interwiki link.")
    )
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("The page action")
        .addChoice("Edit", "edit")
        .addChoice("History", "hist")
        .addChoice("Purge", "prge")
        .addChoice("Page information", "info")
    )

    .addStringOption((option) =>
      option
        .setName("params")
        .setDescription("Additional URL parameters. No need to put a \"&\" or\"?before the url param.")
    ),
  async execute(interaction) {
    const page = interaction.options.getString("page");
    const interwiki = interaction.options.getString("interwiki");
    const action = interaction.options.getString("action");
    const params = interaction.options.getString("params");
    const display = interaction.options.getString("display");

    const reply = await interaction.reply({
      content: linker(page, interwiki, action, display, params),
      fetchReply: true,
    });

    const returnedPromises = [];

    returnedPromises.push(
      Promise.all([
        reply.react("❌"),
        reply.awaitReactions({
          filter: (reaction, reactor) =>
            reactor.id === interaction.user.id && reaction.emoji.name === "❌",
          time: 60000,
          max: 1,
        }),
      ]).then(async ([reaction, reactions]) => {
        if (reactions.size) {
          await reply.delete();
        } else {
          try {
            await reaction.remove();
          } catch (e) {}
        }
      })
    );
  },
};
