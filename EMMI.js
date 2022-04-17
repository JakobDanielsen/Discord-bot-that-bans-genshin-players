const { Client, Intents, Message, MessageEmbed, User, MessageAttachment, Guild } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// TOKEN STORED IN ANOTHER FILE
let config = require("./config.json");

// PREFIX
const prefix ="EMMI.";

//LIST OF SPOTTED GENSHIN IMPACT PLAYERS
let genshinplayers = []


// STATUS AND ACTIVATION CONFIRMATION
client.once('ready', (message) =>{
    client.user.setPresence({ activities: [{name: 'for genshin players', type:"WATCHING" }], status: 'online' });
    console.log("*** E.M.M.I. is online ***");
});


// CHECK THAT GOES OFF EVERY NEW MESSAGE
client.on("messageCreate", message =>{

    
    //let mention = message.mentions.user.first();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    switch (args[0]){
        // STATUS SENDS A LIST WITH GENSHIN PLAYERS WITHIN THE SESSION
        case"STATUS":

        // CHECKS IF THE GENSHIN PLAYERS ARRAY IS EMPTY OR NOT
        if (genshinplayers.length == 0) {
            message.channel.send("Nobody has recently been playing genshin impact")
        } else {
            message.channel.send("People who have recently been playing genshin impact:")
            genshinplayers.forEach(e => {
                message.channel.send(genshinplayers[e])
                console.log(e);
                console.log(genshinplayers)
            })  

        }
        break;
// DEFAULT
        default:
            message.channel.send("command not recognized");

        break;

        
    };
});

client.login(config.token);



