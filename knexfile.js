module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || { user: 'postgres', database: 'mentionbot' },
    useNullasDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullasDefault: true
  }
}
