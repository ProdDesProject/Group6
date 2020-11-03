
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('robots').del()
    .then(function () {
      // Inserts seed entries
      return knex('robots').insert([
        {name: 'Robot1', type: 'type1', payload: 1},
        {name: 'Robot2', type: 'type2', payload: 2},
        {name: 'Robot3', type: 'type1', payload: 1},
      ]);
    });
};
