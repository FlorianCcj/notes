const { MessageEmbed } = require('discord.js');

module.exports = (client, msg) => {
  const embed = new MessageEmbed()
    .setDescription(msg.guild.name)
    .setThumbnail(msg.guild.iconURL())
    .addField('Members', msg.guild.memberCount)
    .setFooter(msg.guild.owner.user.tag, msg.guild.owner.user.avatarURL())
    .setTimestamp()
  ;
  msg.channel.send(embed);
};
