module.exports = class PhraseBank {
  constructor(guildsWithPhrases) {
    this.data = guildsWithPhrases
  }

  addPhrases(guildId, phrases) {
    this.data[guildId].push(...phrases)
  }

  findMatches(guildId, text) {
    return this.data[guildId].filter(phrase => text.includes(phrase))
  }

  hasGuild(guildId) {
    return guildId in this.data
  }
}
