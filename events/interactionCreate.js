const { Collection } = require("discord.js");
const { owners } = require('../config/config')

module.exports = {
    name: "interactionCreate",
    once: false,
   async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
    const command = await client.commands.get(commandName);

    if (!command || !command.SlashCommand) return;
    client.cmdReplys = client.languageJson[command.name];
    if (command.owner && !owners.includes(interaction.user.id)) {
      return await interaction.reply({content: client.generalReplys.owners, ephemeral: true})
     }
    if (!owners.includes(interaction.user.id)) {
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Collection());
      }

      let now = Date.now();
      let timestamps = client.cooldowns.get(command.name);
      let cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(interaction.user.id)) {
        let expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          let timeLeft = (expirationTime - now) / 1000;
          if (!client.cooldowns.has(interaction.user.id)) {
            client.cooldowns.set(interaction.user.id, true);
            return interaction.reply(client.generalReplys.timeOut(timeLeft.toFixed(1)))
              .then(msg => {  
              setTimeout(async () => {
                interaction.deleteReply().catch(err => 400);
              }, 2500);
            });
          } else return;
        }
      }
      timestamps.set(interaction.user.id, now);
      setTimeout(() => {
        timestamps.delete(interaction.user.id);
        client.cooldowns.delete(interaction.user.id);
      }, cooldownAmount);
    }
        try {
          command.SlashCommand.execute(interaction, client)
        }catch(e) {
          client.log(e);
        };

 

   }
}