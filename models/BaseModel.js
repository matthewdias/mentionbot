const { Model, knexSnakeCaseMappers } = require('objection')
const knex = require('knex')

Model.knex(knex({
  client: 'pg',
  connection: process.env.DATABASE_URL || { user: 'postgres', database: 'mentionbot' },
  useNullasDefault: true,
  ...knexSnakeCaseMappers()
}))

module.exports = class BaseModel extends Model {
  static get modelPaths() { return [ __dirname ] }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUdpate() {
    this.updated_at = new Date().toISOString()
  }
}
