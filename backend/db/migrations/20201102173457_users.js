exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.string('classname');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
};
