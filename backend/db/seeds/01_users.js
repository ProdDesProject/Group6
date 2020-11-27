
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'test1',
          email: 'email1',
          password: 'pass1',
          class: 'class1',
          role: 'user'
        },
        {
            name: 'test2',
            email: 'email2',
            password: 'pass2',
            class: 'class2',
            role: 'user'
        },
        {
            name: 'test3',
            email: 'email3',
            password: 'pass3',
            class: 'class3',
            role: 'user'
        },
        {
            name: 'admin',
            email: 'admin',
            password: 'admin',
            class: 'admin',
            role: 'admin'
        }
      ]);
    });
};
