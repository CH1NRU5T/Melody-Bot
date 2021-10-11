const discord = require('discord.js');
const https = require('https');
const client = new discord.Client();
const axios = require('axios');
require('dotenv').config()

const prefix = '=';
const fs = require('fs');
var songLink = ""

client.commands = new discord.Collection()
const commmandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));

for (const file of commmandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//get song function
var songLink1 = (searchQuery) => {
  return axios.get('https://apg-saavn-api.herokuapp.com/result/?q=' + searchQuery)
    .then(res => res.data[0].media_url)
    .catch(err => console.log(err))
}
client.once(`ready`, () => {
  console.log(`MelodyBot is online`);
})

client.on(`message`, msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // console.log(command);
  if (command === `play` || command === `p`) {
    // songLink1().then(res => playSong(msg, res));

    link = songLink1(getSongName(args)).then(res => playSong(msg, res))
  }
  else if (command === `leave`) {
    client.commands.get(`leave`).execute(msg, args);
  }
})

var getSongName = (args) => {
  var name = ""
  args.forEach(element => {
    name += element;
  });
  return name
}

function playSong(msg, link) {
  msg.member.voice.channel.join().then(VoiceConnection => {
    VoiceConnection.play(link, { seek: 0, volume: 1 }).on("finish", () => VoiceConnection.disconnect());
    msg.reply("Playing...");
  }).catch(e => console.log(e))
}

//login
client.login(process.env.TOKEN)