const { raw, transaction } = require('objection')
const { BaseModel, Guild, User, Phrase } = require('../models')

const createUser = async (id, guildId, nickname, username) => {
  return await User.query().insert({
    id,
    guildId,
    nickname,
    username,
  })
}

const findOrCreateUser = async (guildId, member) => {
  let [user] = await User.query().where({
    id: member.id, guildId
  })
  return user || await createUser(member.id, guildId, member.nickname, member.user.username)
}

module.exports = {
  async createGuild(id) {
    let guild = await Guild.query().findById(id)
    return guild || await Guild.query().insert({ id })
  },

  async destroyGuild(id) {
    return await Guild.query().findById(id).delete()
  },

  async getGuild(id) {
    return await Guild.query().findById(id)
  },

  async setChannel(id, channelId) {
    return await Guild.query().where({ id }).patch({ channelId })
  },

  async setMode (guildId, member, dmChannelId, mode) {
    return await User.query().where({ id: member.id, guildId }).patch({ dmChannelId, mode }) ||
    await User.query().insert({
      id: member.id,
      guildId,
      nickname: member.nickname,
      username: member.user.username,
      dmChannelId,
      mode
    })
  },

  async setNameOpt (guildId, member, nameOpt) {
    return await User.query().where({
      id: member.id, guildId
    }).patch({ nameOpt }) ||
    await User.query().insert({
      id: member.id,
      guildId,
      nickname: member.nickname,
      username: member.user.username,
      nameOpt
    })
  },

  async setNickname (member) {
    return await User.query().where({
      id: member.id,
      guildId: member.guild.id
    }).patch({ nickname: member.nickname }) ||
    await createUser(member.id, member.guild.id, member.nickname, member.user.username)
  },

  async setUsername (user) {
    return await User.query().where({ id: user.id }).patch({
      id: user.id,
      username: user.username,
    }).returning('guildId')
  },

  async addPhrases (guildId, member, phrases) {
    await findOrCreateUser(guildId, member)
    return await transaction(BaseModel.knex(), async (t) => {
      await Phrase.query().insertGraph(phrases.map((text) => ({
        text, guildId, userId: member.id
      })))
    })
  },

  async removePhrases (guildId, member, phrases) {
    await findOrCreateUser(guildId, member)
    return await transaction(BaseModel.knex(), async (t) => {
      await Promise.all(phrases.map((text) => {
        return Phrase.query().where({ guildId, userId: member.id, text }).delete()
      }))
    })
  },

  async getSettingsAndPhrases(guildId, member) {
    let [user] = await User.query().where({ guildId, id: member.id }).eager('phrases')
    return user
  },

  async getGuildsWithPhrases () {
    let guilds = await Guild.query().eager('phrases')
    let obj = {}
    await Promise.all(guilds.map(async (guild) => {
      let nicknames = await User.query()
                                .where('guildId', guild.id)
                                .whereIn('nameOpt', ['nickname', 'both'])
      let usernames = await User.query()
                                .where('guildId', guild.id)
                                .whereIn('nameOpt', ['username', 'both'])
      obj[guild.id] = guild.phrases.map(phrase => phrase.text)
      obj[guild.id].push(...nicknames.map(user => user.nickname))
      obj[guild.id].push(...usernames.map(user => user.username))
    }))
    return obj
  },

  async getMentionees(guildId, authorId, phrases) {
    return await User.query()
                     .distinct('users.id', 'mode', 'dmChannelId')
                     .where('users.guildId', guildId)
                     .join('phrases', function() {
                       this.on('users.id', 'phrases.userId')
                           .onIn(raw('LOWER(phrases.text)'), phrases)
                     }).whereNot('phrases.userId', authorId)
                     .union(function() {
                       this.distinct('users.id', 'mode', 'dmChannelId')
                           .from('users')
                           .where('users.guildId', guildId)
                           .whereIn('users.nameOpt', ['nickname', 'both'])
                           .whereIn(raw('LOWER(users.nickname)'), phrases)
                           .whereNot('users.id', authorId)
                     }, function() {
                       this.distinct('users.id', 'mode', 'dmChannelId')
                           .from('users')
                           .where('users.guildId', guildId)
                           .whereIn('users.nameOpt', ['username', 'both'])
                           .whereIn(raw('LOWER(users.username)'), phrases)
                           .whereNot('users.id', authorId)
                     }).groupBy('users.id')
  }
}
