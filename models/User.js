const BaseModel = require('./BaseModel')

module.exports = class User extends BaseModel {
  static get tableName() { return 'users' }
  static get relationMappings() {
    return {
      guild: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Guild',
        join: {
          from: 'users.guildId',
          to: 'guilds.id'
        }
      },
      phrases: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Phrase',
        join: {
          from: 'users.id',
          to: 'phrases.userId'
        }
      }
    }
  }
}
