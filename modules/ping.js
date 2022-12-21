const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    // name: "ping",
    // description: "Show bot ping",
    // options: [],

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Show the bot's websocket ping"),


    run: (interaction) => {
        interaction.reply(`Pong! 🏓 ${interaction.client.ws.ping} ms`);
    }
}