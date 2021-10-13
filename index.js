const discord = require('discord.js');
const https = require('https');
const keepAlive = require('./server');
const client = new discord.Client();
const axios = require('axios');
require('dotenv').config()
const prefix = '=';
const fs = require('fs');

//  Advanced file structure start
client.commands = new discord.Collection()
const commmandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));

for (const file of commmandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
// Advanced file structure end

client.once(`ready`, () => {
  console.log(`MelodyBot is online`);
})

client.on(`message`, msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === `play` || command === `p`) {
    client.commands.get(`play`).execute(msg, args);

  }
  else if (command === `leave`) {
    client.commands.get(`leave`).execute(msg, args);
  }
})


//login
keepAlive();
client.login(process.env.TOKEN)