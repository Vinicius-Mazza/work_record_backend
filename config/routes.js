const admin = require('./admin')

module.exports = app => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)
    .delete(app.api.user.remove)

  app.route('/categories')
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get))
    .post(app.api.category.save)

    // Tomar cuidado com a ordem! Tem que vir antes de /categories/:id
  app.route('/categories/tree')
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree)

  app.route('/categories/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove)
  
  app.route('/clients')
    .all(app.config.passport.authenticate())
    .get(app.api.client.get)
    .post(app.api.client.save)

  app.route('/clients/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.client.getById)
    .put(app.api.client.save)
    .delete(app.api.client.remove)

  app.route('/categories/:id/clients')
    .all(app.config.passport.authenticate())
    .get(app.api.client.getByCategory)

  app.route('/stats')
    .all(app.config.passport.authenticate())
    .get(app.api.stat.get)
}