
exports.up = function(knex) {
  return knex.schema

    .createTable('projects', t => {
      t.increments()
      t.string('name', 25).notNullable()
      t.string('description', 128)
    })

    .createTable('resources', t => {
      t.increments()
      t.string('name', 25).notNullable().unique()
      t.string('description', 128)
    })

    .createTable('tasks', t => {
      t.increments()
      t.string('description', 128).notNullable()
      t.string('notes', 256)
      t.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
