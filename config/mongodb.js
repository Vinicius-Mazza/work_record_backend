const mongoose = require('mongoose')
const url = process.env.mongodb
// const { mongoDB } = require('../.env')
// const url = mongoDB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => {
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
  })