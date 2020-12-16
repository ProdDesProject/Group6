exports.up = function(knex) {
    return knex.schema.createTable("robots", (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('type');
        table.string('url');
        table.string('description')
      });  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('robots');    
};
