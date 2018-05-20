module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('phrases', (t) => {
      t.increments()
      t.string('text')
      t.string('guild_id')
      t.string('user_id')
      t.timestamps()

      t.unique([ 'guild_id', 'user_id', 'text' ])
    })
  },

  down(knex, Promise) {
    return knex.schema.dropTableIfExists('phrases')
  }
}
