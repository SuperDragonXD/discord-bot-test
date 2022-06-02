module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    const favoriteColor =
      interaction.fields.getTextInputValue("favoriteColorInput");
    const hobbies = interaction.fields.getTextInputValue("hobbiesInput");

    await interaction.reply(
      `Your favorite color is ${favoriteColor} and your hobbies are:\n ${hobbies}`
    );
  },
};
