// const { db } = require('./.env')
const DATABASE_URL = 'postgres://aoesuyzzftyoqs:9c82b02549ffd158f2c6a93f60cd29af5ff77b459be1431f805cce9e3044c60c@ec2-54-165-164-38.compute-1.amazonaws.com:5432/d4mgfm6i3m71th'
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
