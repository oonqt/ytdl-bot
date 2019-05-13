const Discord = require("discord.js");
const fs = require("fs");
const { TOKEN, PREFIX } = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on("ready", () => {
    console.log("LOGGED IN", client.user.tag);
    client.user.setActivity("Converting videos - ;convert");
});

client.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift();

    let command = client.commands.get(cmd.slice(PREFIX.length));
    if(command) command.run(Discord, client, message, args);
}); 

fs.readdir("./commands/", (err, files) => {
    let commandFiles = files.filter(f => f.split(".").pop() === "js");

    if(commandFiles.length === 0) return console.error("No commands found");

    commandFiles.forEach(file => {
        let mod = require(`./commands/${file}`);
        client.commands.set(mod.help.name, mod);
        console.log("COMMAND LOADED", file);
    });
});

client.login(TOKEN);