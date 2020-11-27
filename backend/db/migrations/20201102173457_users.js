exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name');
        table.string('email');
        table.string('password');
        table.string('class');
        table.string('role');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users');
};
