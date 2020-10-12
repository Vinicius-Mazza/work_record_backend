// const { db } = require('./.env')
// const connect = db
const connect = process.env.DATABASE_URL

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
