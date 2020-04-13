const { Client, Collection } = require('discord.js');
const CONFIG = require("../config");
const { TOKEN, PREFIX } = require("../config");
const fs = require('fs');
const client = new Client({
  disableEveryone: true
});

client.config = CONFIG;
// client.mongoose = require('./utils/mongoose');

client.commands = new Collection();
fs.readdir('./src/commands', (err, files) => {
  files.forEach(file => {
    client.commands.set(
      file.split('.')[0],
      require(`./commands/${file}`)
    );
  });
});

fs.readdir('./src/events', (err, files) => {
  if (err) {
    return console.log(err);
  }
  files.forEach(file => {
    client.on(
      file.split('.')[0],
      require(`./events/${file}`).bind(null, client)
    );
  });
});

client.on('error', console.error);
client.on('warn', console.warn);

// client.mongoose.init();
client.login(client.config.TOKEN);
