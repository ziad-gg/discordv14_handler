const { firebaseConfig, prefix } = require('../config');
const database = require('../../database/index').quickfirebase;
database.connect(firebaseConfig);

const guildsSchema = new database.Schema({
    prefix: {type: "string", default: prefix},
    lang: {type: "string", default: "en"},
});

const guilds = new database.Model({name: "Guilds", schema: guildsSchema});

module.exports = guilds;