exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', (table) => {
        table.increments('id').unsigned().primary();
        table.string('authority');
      });  
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('roles');    
};
