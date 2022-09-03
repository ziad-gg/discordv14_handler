const { GatewayIntentBits, Client } = require('discord.js');
const bot = require('./build/main');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

new bot(client).build()