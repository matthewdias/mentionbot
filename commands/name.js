const db = require('../src/db')

module.exports = async (message, arg) => {
  if (['username', 'nickname', 'both', 'off'].includes(arg)) {
    await db.setNameOpt(message.guild.id, message.member, arg)
    return `Name mentions mode changed to ${arg}`
  }

  return 'Invalid option. Usage: `@mentionbot name <username|nickname|both|off>`'
}
