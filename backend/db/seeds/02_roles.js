
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {
            id: 1,
            authority: 'ROLE_ADMIN'
        },
        {
            id: 2,
            authority: 'ROLE_USER'
        },
        {
            id: 3,
            authority: 'ROLE_USER'
        }
      ]);
    });
};
