const { Collection } = require("discord.js");
const { owners } = require('../config/config')

module.exports = {
    name: "messageCreate",
    once: false,
   async execute(message, client) {
    if (message.author.bot) return;

     const guildData = await client.database.guildSchema.get(message.guild.id);
      client.prefix = guildData ? guildData.data.prefix : client.prefix;
      if (!message.content.startsWith(client.prefix)) return;
      const args = message.content.slice(client.prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = await client.commands.get(commandName);
     
      if (!command) return;
      client.cmdReplys = client.languageJson[command.name];
      if (command.owner && !owners.includes(message.author.id)) return;
      if (!owners.includes(message.author.id)) {
        if (!client.cooldowns.has(command.name)) {
          client.cooldowns.set(command.name, new Collection());
        }
        let now = Date.now();
        let timestamps = client.cooldowns.get(command.name);
        let cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
          let expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            let timeLeft = (expirationTime - now) / 1000;
            if (!client.cooldowns.has(message.author.id)) {
              client.cooldowns.set(message.author.id, true);
              return message.reply(client.generalReplys.timeOut(timeLeft.toFixed(1)))
                .then(msg => {  
                setTimeout(async () => {
                  msg.delete().catch(err => 400);
                }, 2500);
              });
            } else return;
          }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => {
          timestamps.delete(message.author.id);
          client.cooldowns.delete(message.author.id);
        }, cooldownAmount);
      }

        try {
          command.execute(message, client, args);
        }catch(e) {
          client.log(e);
        };

 

   }
}