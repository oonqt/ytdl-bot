module.exports.run = (Discord, client, message, args) => {
    let pingEmbed = new Discord.RichEmbed()
        .setTitle("YTDL ~ Ping")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL);
    message.channel.send(pingEmbed);
}

module.exports.help = {
    name: "ping"
}