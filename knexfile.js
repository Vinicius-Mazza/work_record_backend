// const { db } = require('./.env')
module.exports = {

  client: 'postgresql',
  connection: '',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
  

};
