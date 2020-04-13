module.exports = (client, msg, args) => {
  const channel = client.guild.channels.cache.find(r => r.name === 'logs');
  const role = msg.guild.roles.cache.find(r => r.name === args[0]);
  if (!role) {
    return msg.channel.send('Ce role n existe pas');
  }
  if (msg.member.role.cache.find(r => r.name === args[0])) {
    msg.member.roles.remove(role);
    channel.send(`J ai supprime le role ${role} a ${msg.author}`);
  } else {
    msg.member.roles.add(role);
    channel.send(`J ai ajoute le role ${role} a ${msg.author}`);
  }
};
