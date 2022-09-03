const { readdirSync } = require("node:fs");

module.exports = async (client) => {
  for (let dir of (readdirSync('commands'))) {
    for (let file of (readdirSync(`commands/`+dir))) {
      const command = require('../../commands/'+dir+"/"+file);
      command.categort = dir;
      client.commands.set(command.name, command);
      if (command.SlashCommand) {
        client.slashs.set(dir, file);
        client.log(`command loaded: [${file.split('.')[0]}]`)
      };

    }
  }
}