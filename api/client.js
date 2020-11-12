const queries = require('./queries')

module.exports = app => {
  const { existsOrError } = app.api.validation
  
  const save = (req, res) => {
    const client = { ...req.body }
    if(req.params.id) client.id = req.params.id

    try {
      existsOrError(client.pacientName, 'Nome do paciente não informado')
      existsOrError(client.dentist, 'Nome do dentista não informado')
      existsOrError(client.workType, 'Tipo de trabalho não informado')
      existsOrError(client.arrivalDate, 'Data de chegada não informado')
      existsOrError(client.stage, 'Etapa do trabalho não informado')
      existsOrError(client.stageStatus, 'Status da etapa não informado')
      // existsOrError(client.departureDate, 'Data de saida não informado')
    }catch(msg) {
      res.status(400).send(msg)
    }

    if(client.id) {
      app.db('clients')
        .update(client)
        .where({ id: client.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
        app.db('clients')
          .insert(client)
          .then(_ => res.status(204).send())
          .catch(err => res.status(500).send(err))
    }
  }
  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app.db('clients')
        .where({ id: req.params.id }).del()
      
      try {
        existsOrError(rowsDeleted, 'Cliente não foi encontrado.')
      }catch(msg) {
        return res.status(400).send(msg)    
      }

      res.status(204).send()
    }catch(msg) {
      res.status(500).send(msg)
    }
  }

  const limit = 3 // Usado para paginação no frontend
  const get = async (req, res) => {
    const page = req.query.page || 1

    const result = await app.db('clients').count('id').first()
    const count = parseInt(result.count)

    app.db('clients')
      .select('id', 'pacientName', 'dentist', 'workType', 'arrivalDate', 'stage', 'stageStatus', 'departureDate', 'obs')
      .limit(limit).offset(page * limit - limit)
      .then(clients => res.json({ data: clients, count, limit }))
      .catch(err => res.status(500).send(err))
  }

  const getById = (req, res) => {
    app.db('clients')
      .where({ id: req.params.id })
      .first()
      .then(client => {
        //As observações não são obrigatorias no cadastro de cliente;
        if(client.obs !== null) {
          client.obs = client.obs.toString()
        }
        return res.json(client)
      })
      .catch(err => res.status(500).send(err))
  }

  const getByCategory = async (req, res) => {
    const categoryId = req.params.id
    const page = req.query.page || 1
    const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
    const ids = categories.rows.map(c => c.id)

    app.db({cl: 'clients'})
      .select('cl.id', 'cl.pacientName', 'cl.dentist', 'cl.workType', 'cl.arrivalDate', 'cl.stage', 'cl.stageStatus', 'cl.departureDate', 'cl.obs')
      .limit(limit).offset(page * limit - limit)
      .whereIn('categoryId', ids)
      .orderBy('cl.id', 'obs')
      .then(clients => res.json(clients))
      .catch(err => res.status(500).send(err))
  }


  return { save, remove, get, getById, getByCategory }

}