exports.seed = function(knex) {
  return knex('projects').insert([   

    { name: 'proj1', description: "The first project" },
    { name: 'proj2', description: "The second project" },
    { name: 'proj3', description: "The third project" },
    { name: 'proj4', description: "The fourth project" },
    { name: 'proj5', description: "The fifth project" },
    { name: 'proj6', description: "The sixth project" },

  ]);
};
