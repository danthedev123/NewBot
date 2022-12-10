module.exports = {
    name: "dice",
    description: "Roll a die",
    run: (interaction) => {
        interaction.reply(String(Math.floor(Math.random() * 6) + 1));
    }
}