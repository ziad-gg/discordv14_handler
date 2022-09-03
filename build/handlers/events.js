const { readdirSync } = require("node:fs")

module.exports = async (client) => {
    for (const file of (readdirSync('events'))) {
        const event = require(`../../events/`+file);
        client.log(`load Event: [${file.split('.')[0]}]`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}