const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

// Utility function
function contactStaff(category, supportSite) {
  /* Constants */
  const zendeskLinks = {
    supportLinks: {
      account_help: "360000931094",
      wiki_changes: "360000931354",
      problem: "360000940393",
      protection: "360000948854",
      other: "360000956114",
    },
    label: {
      account_help: "Account help",
      wiki_changes: "Changes to a wiki",
      problem: "Problem",
      protection: "Protecting my account",
      other: "Other",
    },
    base: {
      contactUrl: "/hc/en-us/requests/new?ticket_form_id=",
      gamepedia: "https://support.gamepedia.com",
      fandom: "https://support.fandom.com",
    },
    sentence: {
      zendeskSentence: "Contact staff:",
      supportSentence: "View the support site of Fandom or Gampedia:",
      defaultSentence:
        "Contact Fandom or Gamepedia by creating a support ticket:",
      fandom: "Fandom",
      gamepedia: "Gamepedia",
    },
  };

  const spamVandal = {
    reply:
      "If you found any vandalism/spam, please go to <#866305196573327370>.\nYou can also see the [SOAP Wiki](<https://soap.fandom.com>) for additional information on reporting spam.",
  };

  const badAd = {
    reply:
      "Found a bad advertisement? See the linked help page for additional information on what to do.",
    link: "https://c.fandom.com/wiki/Help:Bad_advertisements",
    label: "Reporting bad advertisments",
  };

  /* Generators */
  function button(url, label, url2, label2) {
    if (url2) {
      return new MessageActionRow().addComponents(
        new MessageButton().setURL(url).setLabel(label).setStyle("LINK"),
        new MessageButton().setURL(url2).setLabel(label2).setStyle("LINK")
      );
    } else {
      return new MessageActionRow().addComponents(
        new MessageButton().setURL(url).setLabel(label).setStyle("LINK")
      );
    }
  }

  function reply(reply, button) {
    if (button) {
      return { content: reply, components: [button] };
    }

    return reply;
  }

  /* Checker */
  function isZendesk(type) {
    if (zendeskLinks.supportLinks[type]) return true;

    return false;
  }

  /* replies */
  function zendeskReply(category) {
    const url =
      zendeskLinks.base.fandom +
      zendeskLinks.base.contactUrl +
      zendeskLinks.supportLinks[category];

    if (!isZendesk(category)) return;

    return reply(
      zendeskLinks.sentence.zendeskSentence,
      button(url, zendeskLinks.label[category])
    );
  }

  function badAdReply() {
    return reply(badAd.reply, button(badAd.link, badAd.label));
  }

  function spamVandalReply() {
    return reply(spamVandal.reply);
  }

  function supportSiteReply() {
    return reply(
      zendeskLinks.sentence.supportSentence,
      button(
        zendeskLinks.base.fandom,
        zendeskLinks.sentence.fandom,
        zendeskLinks.base.gamepedia,
        zendeskLinks.sentence.gamepedia
      )
    );
  }

  function defaultReply() {
    return reply(
      zendeskLinks.sentence.defaultSentence,
      button(
        zendeskLinks.base.fandom + zendeskLinks.base.contactUrl,
        zendeskLinks.sentence.fandom,
        zendeskLinks.base.gamepedia + zendeskLinks.base.contactUrl,
        zendeskLinks.sentence.gamepedia
      )
    );
  }

  /* Actual reply */
  function mainReply(category, supportSite) {
    if (supportSite) return supportSiteReply();

    if (isZendesk(category)) {
      return zendeskReply(category);
    } else {
      switch (category) {
        case "bad_ad":
          return badAdReply();
          break;
        case "spam_vandal":
          return spamVandalReply();
        default:
          return defaultReply();
      }
    }
  }

  return mainReply(category, supportSite);
}

// Main code
module.exports = {
  data: new SlashCommandBuilder()
    .setName("staff")
    .setDescription(
      "Posts a link to create a ticket to contact Fandom or Gampedia staff"
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Optional category in the ticket")
        .addChoice("Account Help", "account_help")
        .addChoice("Wiki Changes", "wiki_changes")
        .addChoice("Problem", "problem")
        .addChoice("Protection", "protection")
        .addChoice("Other", "other")
        .addChoice("Bad Ad", "bad_ad")
        .addChoice("Spam/Vandal", "spam_vandal")
    )
    .addStringOption((option) =>
      option
        .setName("support_site")
        .setDescription(
          "Goes to Fandom/Gamepedia's support site, instead of directly creating a ticket."
        )
        .addChoice("Yes", "yes")
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    const supportSite = interaction.options.getString("support_site");

    await interaction.reply(contactStaff(category, supportSite));
  },
};
