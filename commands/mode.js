const db = require('../src/db')

module.exports = async (message, arg) => {
  if (['channel', 'dm', 'off'].includes(arg)) {
    if (arg == 'channel') {
      let guild = await db.getGuild(message.guild.id)
      console.log(guild)
      if (!guild.channelId) {
        return 'Admin has not yet set mentions channel'
      }
    }
    let dmChannelId
    if (arg == 'dm') {
      let dmChannel = await message.author.createDM()
      dmChannelId = dmChannel ? dmChannel.id : null
    }
    await db.setMode(message.guild.id, message.member, dmChannelId, arg)
    return `Mode changed to ${arg}`
  }

  return 'Invalid option. Usage: `@mentionbot mode <channel|dm|off>`'
}
