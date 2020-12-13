exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('reservations').del()
      .then(function () {
        // Inserts seed entries
        return knex('reservations').insert([
            { 
                userId: 1,
                robotId: 1,
                date: '2020-11-09',
                time: '[13]'
            },
            { 
                userId: 1,
                robotId: 2,
                date: '2020-11-09',
                time: '[14, 15]'
            },
            { 
                userId: 2,
                robotId: 3,
                date: '2020-11-10',
                time: '[16, 17]'
            }
        ]);
      });
  };
