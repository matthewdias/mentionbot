module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('guilds', (t) => {
      t.string('id').primary().unique()
      t.string('channel_id')
      t.timestamps()
    })
  },

  down(knex, Promise) {
    return knex.schema.dropTableIfExists('guilds')
  }
}
