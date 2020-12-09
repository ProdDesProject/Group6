exports.up = function(knex) {
    return knex.schema.createTable("robots", (table) => {
        table.increments('id');
        table.string('name', 20);
        table.string('type', 5);
        table.string('url', 20);
        table.string('description', 30)
      });  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('robots');    
};
