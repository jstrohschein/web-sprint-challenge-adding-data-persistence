
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
      t.integer('task_id')
        .unsigned()
        .notNullable()
        .references('project.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })


    .createTable('project-tasks', tbl =>{
      tbl.integer('project.id')
        .unsigned()
        .notNullable()
        .references('project.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('task.id')
        .unsigned()
        .notNullable()
        .references('task.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.primary(['project_id', 'task.id'])//composite primary key 
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project-tasks')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
