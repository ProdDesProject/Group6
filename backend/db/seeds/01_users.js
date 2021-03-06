
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
            name: 'admin',
            email: 'admin',
            password: '$2y$10$Wnc42m2MxMpIYcodFGd1sOy3caDPKRDK1Z78fO/QJqBRVvwSj3MPO', //admin
            role: 'user',
            classname: 'testi'
        },
        {
            name: 'test1',
            email: 'email1',
            password: 'pass1',
            role: 'user',
            classname: 'class1'
        },
        {
            name: 'test2',
            email: 'email2',
            password: 'pass2',
            role: 'user',
            classname: 'class2'
        },
        {
            name: 'test3',
            email: 'email3',
            password: 'pass3',
            role: 'user',
            classname: 'class3'
        },
        {
            name: 'test4',
            email: 'email4',
            password: '$2y$10$UPnt54cHVTeD/CH7f3BRW.e3pQN7uahy7ja5SdO96ivtAn6ip5pWW', //pass4
            role: 'admin',
            classname: 'class4'
        }
      ]);
    });
};
