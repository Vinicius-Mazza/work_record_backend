const mongoose = require('mongoose')
// const { mongodb } = require('../.env')
const mongodb = 'mongodb+srv://Mazza:workrecord@cluster0.qspgq.mongodb.net/work_record_stats?retryWrites=true&w=majority'

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => {
    const msg = 'ERRO! Não foi possível conectar com o MongoDB!'
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
  })