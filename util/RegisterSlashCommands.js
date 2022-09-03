const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token } = require('../config/config')

var commands = new Array();

module.exports.RegisterSlashCommands = async (client) => {
   await client.slashs.forEach(async (value, key) => {
       const command = require('../commands/'+key+"/"+value);
       const slashSetting = command.SlashCommand;
       var slashsLoad = new SlashCommandBuilder().setName(command.name).setDescription(command.description);
       slashSetting.Options.forEach(option => {
        const name = new String(option.name)
        const description = new String(option.description);

         if (option.type === "string") {
           option.require ?  slashsLoad.addStringOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addStringOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };

         if (option.type === "number") {
            option.require ? slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };

         if (option.type === "user") {
            option.require ? slashsLoad.addUserOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };

         if (option.type === "channel") {
            option.require ? slashsLoad.addChannelOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };

         if (option.type === "role") {
            option.require ? slashsLoad.addRoleOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };

         if (option.type === "attach") {
            option.require ? slashsLoad.addAttachmentOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(true)) : slashsLoad.addNumberOption(option => option.setName(`${name}`).setDescription(`${description}`).setRequired(false))
         };


       })
       commands.push(slashsLoad);
   });
   const rest = new REST({ version: '10' }).setToken(token);
   rest.put(Routes.applicationCommands(client.user.id), { body: commands.map(e => e.toJSON())})
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
}