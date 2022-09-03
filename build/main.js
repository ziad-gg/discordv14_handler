mode     : '0644'
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, prefix, lang, messages, slashs, embedColor  } = require('../config/config');
const { readdirSync } = require("node:fs");
const logger = require('./logger');
const log = new logger('logs.log');
const { RegisterSlashCommands } = require("../util/RegisterSlashCommands");
const guildSchema = require("../config/models/guilds");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

module.exports = class Bot {
    
  constructor(client) {
    this.client = client || void(0,0)
    this.client.prefix = prefix;
    this.defultLang = lang;
    this.client.database = {
      guildSchema,
    }
    this.client.cooldowns = new Collection();
    this.client.commands = new Collection();
    this.client.slashs = new Collection();
    this.client.languageJson = require("../config/languages/en");
    this.client.generalReplys = client.languageJson.general;
    this.client.embedColor = embedColor

    this.client.log = (text) => {
        log.log(text || "nothing")
    }
  }

  async Loadhandlers() {
    for (let file of (readdirSync("./build/handlers"))) {
      require(`./handlers/${file}`)(this.client)
    }
  };

   async build() {
      await this.client.login(token);
      await this.Loadhandlers();
      if (slashs) await RegisterSlashCommands(this.client)
   };

}