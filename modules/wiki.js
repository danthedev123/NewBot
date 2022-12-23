const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wikipedia = require("wikipedia");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Get an article from Wikipedia")
    .addStringOption((o) =>
      o.setName("article").setDescription("The article name").setRequired(true)
    ),

  run: async (interaction) => {
    let articleName =
      interaction.options.getString("article") ?? "No article provided";

    try {
      const sum = await wikipedia.summary(articleName);
      const image = sum.thumbnail.source;
      const embed = new EmbedBuilder()
        .setColor("White")
        .setTitle(sum.title)
        .setDescription(sum.description)
        .setURL(sum.content_urls.desktop.page)
        .addFields({ name: "Source", value: "Wikipedia" });

      if (image) {
        embed.setThumbnail(image);
      }

      interaction.reply({ embeds: [embed] });
    } catch (error) {
        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Couldn't get article")
            .setDescription("Couldn't get the article. Maybe it doesn't exist or you spelt it wrong?")

        interaction.reply(
            { 
                embeds: [errorEmbed]
            }
        );
    }
  },
};
