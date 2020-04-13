module.exports = (client, member) => {
  member.send('Tu as fait le bon choix');
  const channel = client.channels.cache.find(r => r.name === 'general');
  if (channel === undefined) {
    return;
  }
  channel.send(`${member} nous a quitte`);
};
