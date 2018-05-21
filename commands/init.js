const Discord = require('discord.js')
const db = require('../src/db')

module.exports = async (message) => {
  if (!message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    return 'You must be an admin to init'
  }

  await db.createGuild(message.guild.id)
  return 'Init successful'
}
