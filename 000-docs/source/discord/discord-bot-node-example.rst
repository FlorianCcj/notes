Discord - Bot - NodeJS - First Example
######################################

.. code-block:: js

    const { Client } = require('discord.js');
    const { TOKEN, PREFIX } = require("../config");
    const client = new Client({
      disableEveryone: true
    });

    /**
    * Main example
    */

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {
      if (msg.content === 'ping') {
        msg.reply('Pong!');
      }
    });

    /**
    * check prefix
    */

    client.on('message', (msg) => {
      if (msg.content.startsWith(`${PREFIX}ping`)) {
        msg.reply('Pong!');
      }
      if (msg.content.startsWith(`${PREFIX}pong`)) {
        msg.reply('Ping!');
      }
    });

    /**
    * catch argument
    */

    client.on('message', (msg) => {
      if (msg.author.bot) {
        return;
      }
      const args = msg.content.split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd === `${PREFIX}pung`) {
        msg.reply('Pang!');
      }
      if (cmd === `${PREFIX}pang`) {
        msg.reply('Pung!');
      }
    });

    /**
    * some event example
    */

    client.on('error', console.error);
    client.on('warn', console.warn);
    client.on('debug', console.log);

    client.on('guildMemberAdd', member => {
      member.send("Salut a toi,je pense que tu t es tromper de server");
      const channel = client.channels.cache.find(r => r.name === "général");
      channel.send(`${member} est perdu pour venir ici`)
    });

    client.login(TOKEN);
