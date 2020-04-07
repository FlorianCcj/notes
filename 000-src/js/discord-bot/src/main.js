const { Client } = require('discord.js');
const client = new Client({
  disableEveryone: true
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NjA1MDAzMTI4NTU5MTA4MTA3.XozE7w.E40xO1UZ4P9uo55El3CIGNDkY_4');
