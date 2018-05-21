module.exports = {
  up(knex, Promise) {
    return knex.schema.createTable('users', (t) => {
      t.string('id').primary()
      t.string('guild_id')
      t.string('nickname')
      t.string('username')
      t.string('dm_channel_id')
      t.enu('mode', [ 'off', 'channel', 'dm' ]).defaultTo('off')
      t.enu('name_opt', [ 'off', 'username', 'nickname', 'both' ]).defaultTo('off')
      t.timestamps()

      t.unique([ 'id', 'guild_id' ])
    })
  },

  down(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  }
}
