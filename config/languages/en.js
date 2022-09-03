module.exports = {
  
    general: {
      timeOut: (t) => `> **🙄 - Please wait ${t} seconds!**`,
      noPermissions: (p) => `> **You cannot use this command, because you do not have the following permissions [${p}]!**`,
      cmdDm: `> **🙄 This command can only be used in DMs!**`,
      owners: `> **This command can only be used by Owners!**`
    },
    
    help: {
      info: {
        description: `See all commands and inquire about how to use a particular command.`
      },
      ghTitle: `**Commands List**`,
      ghFooter: (p) => `For more information on a specific command,\nrun ${p}help (Command)`,
      ghSections: [
        `**General**`,
        `**Admins**`
      ],
      chTitle: (c) => `**Command: ${c}**`,
      chFooter: ``,
      chSections: [
        `**Aliases:**`,
        `**Usages:**`,
        `**Examples:**`
      ],
      chNotFound: `> **🙄 - I can't find this command!**`
    },
    
    ping: {
      info: {
        description: `Test the bots response time.`
      },
      pong: '> **🏓 Pong...**'
    },
    
    setlanguage: {
      info: {
        description: `Sets your preferred language to the bot.`
      },
      notFoundLanguage: (l) => `> **🙄 Supported languages are __${l}__**`,
      done: `> **✅ Language changed successfully!**`
    },
    
    setprefix: {
      info: {
        description: `Sets your favorite prefix to the bot.`
      },
    }
    
  };