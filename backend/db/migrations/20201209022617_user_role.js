exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_role', (table) => {
        table.integer('role_id').unsigned();
        table.foreign('role_id').references('id').inTable('roles');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
      });  
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('user_role');    
};
