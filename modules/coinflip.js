const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    // name: "coinflip",
    // description: "Flip a coin",
    // options: [],
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Flip a coin"),


    run(interaction) {
        let random = Math.round(Math.random());

        interaction.reply(random ? "Heads" : "Tails");
    }
}