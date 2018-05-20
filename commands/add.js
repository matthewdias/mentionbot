const db = require('../src/db')

module.exports = async (message, args, phraseBank) => {
  let phrases = args.split(',').map(phrase => phrase.trim().replace(/"/g, ''))
  await db.addPhrases(message.guild.id, message.member, phrases)
  phraseBank.addPhrases(message.guild.id, phrases)
  return 'Phrases added'
}
