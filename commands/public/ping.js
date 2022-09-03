const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    description: "know bot response time",
    cooldown: 10,
   async execute(message, client, args) {

      let now_time = Date.now();
      let msg = await message.reply({ content: client.cmdReplys.pong })
      let embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
      .setDescription(`**📊 Time Taken: ${Date.now() - now_time} ms\n🌐 Web Socket: ${client.ws.ping} ms**`);
      await msg.edit({content: "", embeds: [embed] });
    
   },

   SlashCommand: {
      Options: [
      //   {type: "string", name: "youname", description:"hello boy", require: true},
      //   {type:  "number", name: "amount", description: "write number", require: false}         
      ],
    async execute(interaction, client, args) {

     
      let now_time = Date.now();
       let embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
      .setDescription(`**📊 Time Taken: ${-(Date.now() - interaction.createdTimestamp)}ms. \n🌐 Web Socket ${Math.round(client.ws.ping)}ms **`);
      await interaction.reply({ embeds: [embed] });

    }
   },
};