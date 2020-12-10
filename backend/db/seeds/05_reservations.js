exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('reservations').del()
      .then(function () {
        // Inserts seed entries
        return knex('reservations').insert([
            { 
                userId: 1,
                robotId: 1,
                startDate: '2020-11-09 12:00:00',
                dueDate: '2020-11-09 13:00:00'
            },
            { 
                userId: 1,
                robotId: 2,
                startDate: '2020-11-09 14:00:00',
                dueDate: '2020-11-09 15:00:00'
            },
            { 
                userId: 2,
                robotId: 3,
                startDate: '2020-11-09 15:00:00',
                dueDate: '2020-11-09 16:00:00'
            }
        ]);
      });
  };
