const { Formatters } = require("discord.js");

module.exports = {
  name: "modalSubmit",
  execute(modal) {
    if (modal.customId === "modal-customid") {
      const firstResponse = modal.getTextInputValue("textinput-customid");
      modal.reply(
        "Congrats! Powered by discord-modals." +
          Formatters.codeBlock("markdown", firstResponse)
      );
    }
  },
};
