// const { db } = require('./.env')

module.exports = {

  client: 'postgresql',
  connection: {
    host : '127.0.0.1',
    port: 5432,
    database: 'work_record',
    user: 'postgres',
    password: '3301'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
