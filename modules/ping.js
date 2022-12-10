module.exports = {
    name: "ping",
    description: "Show bot ping",
    run: (interaction) => {
        interaction.reply(`Pong! 🏓 ${interaction.client.ws.ping} ms`);
    }
}