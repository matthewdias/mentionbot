const BaseModel = require('./BaseModel')

module.exports = class Guild extends BaseModel {
  static get tableName() { return 'guilds' }
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'User',
        join: {
          from: 'guilds.id',
          to: 'users.guildId'
        }
      },
      phrases: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'Phrase',
        join: {
          from: 'guilds.id',
          to: 'phrases.guildId'
        }
      }
    }
  }
}
