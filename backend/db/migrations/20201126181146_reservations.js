exports.up = function(knex) {
    return knex.schema.createTable('reservations', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned();
        table.integer('robotId').unsigned();
        table.dateTime('startDate');
        table.dateTime('dueDate');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('reservations');
};