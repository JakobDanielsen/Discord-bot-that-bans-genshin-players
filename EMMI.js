   const { Client, Intents, Message, MessageEmbed, User, MessageAttachment, Guild } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//importer json fil for å skjule token så det ikke blir resatt hver gang vi pusher botten til main
let config = require("./config.json");

const prefix ="+";



client.once('ready', (message) =>{
    client.user.setPresence({ activities: [{ name: 'scanning for genshin players' }], status: 'online' });


    let mention = message.mentions.user.first();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    switch (args[0]){
        case "ping":
            message.channel.send("pong")
        break;
        default:
            message.channel.send("this is not a valid command, to see all commands type +help");

        break;

        
    };
});
client.login(config.token);



