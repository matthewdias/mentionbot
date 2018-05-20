const BaseModel = require('./BaseModel')

module.exports = class Phrase extends BaseModel {
  static get tableName() { return 'phrases' }
  static get relationMappings() {
    return {
      guild: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Guild',
        join: {
          from: 'phrases.guildId',
          to: 'guilds.id'
        }
      },
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User',
        join: {
          from: 'phrases.userId',
          to: 'users.id'
        }
      }
    }
  }
}
