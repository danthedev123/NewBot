const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whoami")
        .setDescription("Show info about this bot"),

    run(interaction) {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Who am I?")
            .setDescription("🌲 This bot was built for this server. It has many cool commands, check them out. If you want a bot built for you for free, create a ticket!")
        
        interaction.reply({
            embeds: [embed]
        })
    }
}