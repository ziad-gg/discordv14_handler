module.exports = {
    name: "setprefix",
    description: "set your bot prefix",
    owner: true,
   async execute(message, client, args) {
         await client.database.guildSchema.create(message.guild.id);
         const guildData = await client.database.guildSchema.get(message.guild.id);
         let newprefix = args[0] || client.prefix
         guildData.data.prefix = newprefix;
         guildData.save();
 
         await message.reply({content: `> **done the new prefix is \`${guildData.data.prefix}\`**`});
   },

   SlashCommand: {
      Options: [
         {type: "string", name: "prefix", description:"your new prefix", require: false},
      ],
    async execute(interaction, client, args) {

        await client.database.guildSchema.create(interaction.guild.id);
        const prefix = interaction.options.getString('prefix') || client.prefix;
        const guildData = await client.database.guildSchema.get(interaction.guild.id);
        guildData.data.prefix = prefix;
        guildData.save();

        await interaction.reply({content: `> **done the new prefix is \`${guildData.data.prefix}\`**`});
         
    }
   },
};