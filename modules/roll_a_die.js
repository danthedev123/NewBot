const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("Roll a die"),


    run: (interaction) => {
        interaction.reply(String(Math.floor(Math.random() * 6) + 1));
    }
}