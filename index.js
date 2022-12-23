const {
  REST,
  Routes,
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const { token, appId } = require("./auth.json");
const fs = require("fs");

let commandExec = new Collection();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const rest = new REST({ version: "10" }).setToken(token);
// Authenticate into Discord with our API token. Or rather, "bot token"
client.login(token).then(() => {
  console.log("Login successful");
});

/* ===== MongoDB Connection ===== */

// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://shoshonebot:firewatch@cluster0.yygc0wi.mongodb.net/test").then(() => {
//   console.log("Connected to MongoDB Atlas");
// })

client.on("ready", () => {
  // rest.put(Routes.applicationCommands("1050285068481986580"), { body: [] })
  // .then(() => console.log('Successfully deleted all application commands.'))
  // .catch(console.error);
  // return

  console.log(`${client.user.tag} is ready`);

  // Get the files in the modules directory
  fs.readdir("./modules/", async (err, res) => {
    if (err) {
      console.log("ERROR reading modules");
      return;
    }

    console.log("Reading modules");

    // Get the commands that are currently registered in the bot via the Discord API.
    let c = [];

    const cmdLoop = async () => {
      for (let i = 0; i < res.length; i++) {
        console.log(`./modules/${res[i]}`);
        const foo = require(`./modules/${res[i]}`);

        commandExec.set(foo.data.name, foo.run);

        c.push(
          // name: foo.name,
          // description: foo.description,
          // options: foo.options,

          foo.data
        );
      }
    };
    await cmdLoop(); // Use await so console.log(c) doesn't run before loop is finished
    console.log(c);

    // Put the c into the API and catch any errors
    try {
      rest.put(Routes.applicationCommands(appId), {
        body: c,
      });
    } catch (e) {
      throw new Error(e);
    }

    client.on("interactionCreate", (i) => {
      if (!i.isCommand()) return; // This is the command handler; don't handle any other interactions (i.e buttons, dropdowns)
      commandExec.get(i.commandName)(i); // Pass the interaction into the command.
    });
  });
});
