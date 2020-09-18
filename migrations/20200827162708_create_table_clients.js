
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', table => {
      table.increments('id').primary()
      table.string('pacientName').notNull()
      table.string('dentist').notNull()
      table.string('workType').notNull()
      table.string('arrivalDate').notNull()
      table.string('stage').notNull()
      table.string('stageStatus').notNull()
      table.string('departureDate').notNull()

      // Em observação
      table.string('price')
      table.binary('obs')
      // Pra referenciar nas categorias
      table.integer('categoryId').references('id')
        .inTable('categories').notNull()
      
        // table.integer('userId').references('id')   # Talves não seja necessario
      //     .inTable('users').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients')
};
