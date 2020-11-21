
exports.seed = function(knex) {
  return knex('resources').insert([

    { name: "resource 1", description: 'blah' }, 
    { name: "resource 2", description: 'blah' }, 
    { name: "resource 3", description: 'blah' }, 
    { name: "resource 4", description: 'blah' },
    { name: "resource 5", description: 'blah' }, 
    { name: "resource 6", description: 'blah' }, 
    { name: "resource 7", description: 'blah' }, 
    { name: "resource 8", description: 'blah' },
    { name: 'resource 9', description: 'blah' },

  ]);
};
