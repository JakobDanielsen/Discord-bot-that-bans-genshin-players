const { Client, Intents, Message, MessageEmbed, User, MessageAttachment, Guild } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
let config = require("./config.json");

const prefix ="+";



client.once('ready', (message) =>{
    client.user.setPresence({ activities: [{name: 'for genshin players', type:"WATCHING" }], status: 'online' });
    console.log("E.M.M.I. is online");
});



client.on("messageCreate", message =>{

    
    //let mention = message.mentions.user.first();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    switch (args[0]){
        case"loserlist":
        message.channel.send("People who i have caught playing genshin impact:")
        break;

        default:
            message.channel.send("this is not a valid command, to see all commands type +help");

        break;

        
    };
});

client.login(config.token);



