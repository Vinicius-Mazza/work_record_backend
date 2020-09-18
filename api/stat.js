module.exports = app => {
  const Stat = app.mongoose.model('Stat', {
      users: Number,
      categories: Number,
      clients: Number,
      createdAt: Date
  })

  const get = (req, res) => {
      Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
          .then(stat => {
              const defaultStat = {
                  users: 0,
                  categories: 0,
                  clients: 0
              }
              res.json(stat || defaultStat)
          })
  }

  return { Stat, get }
}