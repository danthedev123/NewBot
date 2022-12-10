module.exports = {
    name: "coinflip",
    description: "Flip a coin",
    run(interaction) {
        let random = Math.round(Math.random());

        interaction.reply(random ? "Heads" : "Tails");
    }
}