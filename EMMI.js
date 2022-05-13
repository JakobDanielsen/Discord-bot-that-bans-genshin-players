const { Client, Intents, Message, MessageEmbed, User, MessageAttachment, Guild } = require('discord.js');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES, 
    Intents.FLAGS.GUILD_MEMBERS 
] });


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
        // // STATUS SENDS A LIST WITH GENSHIN PLAYERS WITHIN THE SESSION
        // case"STATUS":

        // // CHECKS IF THE GENSHIN PLAYERS ARRAY IS EMPTY OR NOT
        // if (genshinplayers.length == 0) {
        //     message.channel.send("Nobody has been playing genshin impact:")
        // } else {
        //     message.channel.send("People who have been playing genshin impact:")
        //     genshinplayers.forEach(e => {
        //         message.channel.send(e)
        //         console.log(e);
        //         console.log(genshinplayers)
        //     })  

        // }
        // break;

        case"SERVERS":
        const Guilds = client.guilds.cache.map(guild => guild.name);
        message.channel.send("E.M.M.I. bot are in these servers: " + JSON.stringify(Guilds));
        break;
        case"TEST":
        message.channel.send(`You sent this message in ${message.guild.name}`)
        break;
// DEFAULT
        default:
            message.channel.send("command not recognized");
        break;
    };
});

client.on('presenceUpdate', (oldMember, newMember) => {
    console.log("------------------------") // For better readabilty
    const guild = newMember.guild;
    member = newMember;
    if (newMember.user.bot) return;
    
    activityLength = newMember.member.presence.activities.length;

    //check to see if the user has an activities, and if so, how many
    if (activityLength > 0 ){
        console.log(newMember.user.tag + " has " + activityLength + " activities");

        for (let i = 0; i < activityLength; i++) {         
          
        //Debugging messages to the log
        console.log(newMember.user.tag +`'s activity in ${guild.name} position `  + i + " is " + newMember.member.presence.activities[i].name.toLowerCase());
        //console.log("now in lower case " + newMember.member.presence.activities[0].name.toLowerCase());
        //If you want to ban players of any other game than LOL, changer where it says league of legends to any other lowercase name of a game
        if (newMember.member.presence.activities[i].name.toLowerCase() == "genshin impact") { // Started playing.
            console.log(`************** ${newMember.user.tag} IS PLAYING GENSHIN IMPACT IN ${guild.name} **************`);
            genshinplayers.push(newMember.user.tag)
            console.log(genshinplayers);

            // THIS IS A CHANNEL SPESIFICALLY FOR MY SERVER, CHANGE THIS WITH YOUR CHANNELS ID 

            try{
                guild.members.ban(`${newMember.user.id}`, {reason: 'PLAYING GENSHIN IMPACT'}).catch((err) => {
                console.error(err);
                var x = err.message;});
                client.channels.cache.get('551810687916179467').send(`${newMember.user} IS PLAYING GENSHIN IMPACT AND WAS BANNED FROM ${guild.name}`)
                break;
            }
            catch(err){    
            }

        }
    }
    } else {
        console.log(newMember.user.tag +" has no activities");
    } 
});


client.login(config.token);

// Code by Jakob Danielsen and M-et


