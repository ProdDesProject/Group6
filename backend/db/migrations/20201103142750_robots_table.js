exports.up = function(knex) {
    return knex.schema.createTable("robots", (table) => {
        table.increments('id');
        table.string('name', 20);
        table.string('type', 15);
        table.string('url', 30);
        table.string('description', 100)
      });  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('robots');    
};
