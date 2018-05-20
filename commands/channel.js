const Discord = require('discord.js')
const db = require('../src/db')

module.exports = async (message, args) => {
  if (!message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    return 'You must be an admin to change the mention channel'
  }

  let channel = args.match(/<#(\d+)>/)
  if (channel) {
    channel = message.guild.channels.get(channel[1])
    if (channel) {
      await db.setChannel(message.guild.id, channel.id)
      return `Mention channel set to <#${channel.id}>`
    }
  }

  return 'Invalid channel. Usage: `@mentionbot channel #<channel name>`'
}
