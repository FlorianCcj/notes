module.exports = (client, msg, args) => {
  msg.channel.send(args.join(" "));
  msg.delete({timeout: 3000}).then(console.log("Un msg a ete supprime"));
};
