const { db } = require('./.env')
const connect = process.env.DATABASE_URL ? process.env.DATABASE_URL : db

module.exports = {

  client: 'postgresql',
  connection: connect,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
