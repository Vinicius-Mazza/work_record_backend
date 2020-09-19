// const { db } = require('./.env')

module.exports = {

  client: 'postgresql',
  connection: DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
  

};
