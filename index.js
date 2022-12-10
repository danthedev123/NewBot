const { REST, Routes, Client, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./auth.json");
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


client.on("ready", () => {

  console.log(`${client.user.tag} is ready`);

  // Get the files in the modules directory
  fs.readdir("./modules/", async (err, res) => {
    if (err) {
      console.log("ERROR reading modules");
      return;
    }

    console.log("Reading modules");

    // Get the commands that are currently registered in the bot via the Discord API.
    let c = await rest.get(Routes.applicationCommands("1050285068481986580")); // - application ID (found in Discord developer portal)

    const cmdLoop = async () => {
      for (let i = 0; i < res.length; i++) {
        
        console.log(`./modules/${res[i]}`);
        let fooFound = false;
        const foo = require(`./modules/${res[i]}`);

        commandExec.set(foo.name, foo.run);

        if (c) {
          c.forEach((command) => {
            if (command.name === foo.name) {
              fooFound = true;
            }
          });

          if (fooFound === false) {
            c.push({
              name: foo.name,
              description: foo.description,
            });
          }
        }
      }
    };
    await cmdLoop(); // Use await so console.log(c) doesn't run before loop is finished
    console.log(c);

    // Put the new c into the API and catch any errors
    try {
      rest.put(Routes.applicationCommands("1050285068481986580"), {
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
