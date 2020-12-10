
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('robots').del()
    .then(function () {
      // Inserts seed entries
      return knex('robots').insert([
        {name: 'Robot1', type: 'type1', url: "url_to_image1.png", description: "description1"},
        {name: 'Robot2', type: 'type2', url: "url_to_image2.png", description: "description2"},
        {name: 'Robot3', type: 'type1', url: "url_to_image3.png", description: "description3"}
      ]);
    });
};
