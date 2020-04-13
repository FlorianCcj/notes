module.exports = (client, msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.indexOf(client.PREFIX) !== 0) {
    return;
  }
  const args = msg.content.slice(client.PREFIX.length).split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (client.commands.has(cmd)) {
    client.commands.get(cmd)(client, msg, args)
  }
};
