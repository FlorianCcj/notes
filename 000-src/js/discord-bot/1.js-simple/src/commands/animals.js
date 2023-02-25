const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js');

module.exports = async (client, msg, args) => {
  msg.delete({timeout: 3000});

  if (args[0] === "cat") {
    const url_cat = "http://aws.random.cat/meow";
    const cat = await fetch(url_cat)
      .then(res => res.json())
      .then(json => json.file)
    ;
    const embed = new MessageEmbed()
      .setImage(cat)
      .setFooter(`Powered by '${url_cat}'`)
    ;
    msg.channel.send(embed);
  } else if (args[0] === "dog") {
    const url_dog = "https://dog.ceo/api/breeds/image/random";
    const dog = await fetch(url_dog)
      .then(res => res.json())
      .then(json => json.message)
    ;
    const embed = new MessageEmbed()
      .setImage(dog)
      .setFooter(`Powered by '${url_dog}'`)
    ;
    msg.channel.send(embed);
  } else if (args[0] === "fox") {
    const url_fox = "https://randomfox.ca/floof/";
    const fox = await fetch(url_fox)
      .then(res => res.json())
      .then(json => json.image)
    ;
    const embed = new MessageEmbed()
      .setImage(fox)
      .setFooter(`Powered by '${url_fox}'`)
    ;
  } else {
    msg.channel.send("Les animaux disponibles: cat, dog, fox !")
  }
}
