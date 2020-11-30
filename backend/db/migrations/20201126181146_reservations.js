exports.up = function(knex) {
    return knex.schema.createTable('reservations', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().references('id').inTable('users');
        table.integer('robotId').unsigned().references('id').inTable('robots');
        table.dateTime('startDate');
        table.dateTime('dueDate');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('reservations');
};