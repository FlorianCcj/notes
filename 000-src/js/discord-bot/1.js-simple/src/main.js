const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require("../config");
const client = new Client({
  disableEveryone: true
});

client.PREFIX = PREFIX;

client.commands = new Collection();
const commands = [
  "ping",
  "pong",
  "repeat",
  "role",
  "sinfo"
]
commands.forEach(command => {
  client.commands.set(command, require(`./commands/${command}.js`));
});

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', (msg) => require('./events/message.js')(client, msg));
client.on('guildMemberAdd', (member) => require('./events/guildMemberAdd.js')(client, member));
client.on('guildMemberAdd', (member) => require('./events/guildMemberRemove.js')(client, member));

client.on('error', console.error);
client.on('warn', console.warn);
client.on('debug', console.log);

client.login(TOKEN);
