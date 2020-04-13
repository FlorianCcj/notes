module.exports = (client, member) => {
  member.send('Salut a toi, je pense que tu t es tromper de server');
  const channel = client.channels.cache.find(r => r.name === 'general');
  if (channel === undefined) {
    return;
  }
  channel.send(`${member} est perdu pour venir ici`);
};
