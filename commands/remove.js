const db = require('../src/db')

module.exports = async (message, args) => {
  let phrases = args.split(',').map(phrase => phrase.trim().replace(/"/g, ''))
  await db.removePhrases(message.guild.id, message.member, phrases)
  return 'Phrases removed'
}
