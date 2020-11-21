const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
}

function find() {
  return db('projects')
}

function findById(id) {
  const project = 
    db('projects')
      .where({id})
      .first()
  return project
}

function add(project) {
  return db('projects')
    .insert(project, 'id')
    .then(([id]) => findById(id))
}


function update(id, changes) {

}

function remove(id) {
  return db('projects').where({ id }).truncate()
}