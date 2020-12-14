exports.up = function(knex, Promise) {
    return knex.schema.createTable('reservations', (table) => {
        table.increments('reservartionId').unsigned().primary();
        table.integer('userId').unsigned();
        table.foreign('userId').references('id').inTable('users');
        table.integer('robotId').unsigned();
        table.foreign('robotId').references('id').inTable('robots');
        table.string('date');
        table.string('time');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('reservations');
};