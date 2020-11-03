
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'test1',
          email: 'email4563256234523452352345234',
          password: 'sdfgrtggsdfdfgssdfg',
          class: 'class_testi_12312314321412341234123'
        },
        {
          name: 'name_test_43r56345634563456534534653463456345',
          email: 'email_test_2_____345',
          password: 'password_test.65645645',
          class: 'class_testr54356346435'
        },
        {
          name: '22222222222222222222222222',
          email: '11111111111111111111',
          password: 'passewqeqwsdf',
          class: '44444444444444444446435'
        },
        {
          name: '22222222222222222222222222',
          email: '11111111111111111111',
          password: 'passewqeqwsdf',
          class: '44444444444444444446435'
        }


      ]);
    });
};
