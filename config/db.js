const config = require('../knexfile.js')
const knex = require('knex')(config)

// Carregando migrations automaticamente (não recomendado)
knex.migrate.latest([config])
module.exports = knex