// build your `Resource` model here
const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  findResources,
  add,
  update,
  remove
}

function find() {
  return db('resources')
}

function findById(id) {
  return db('resources')
    .where({ id }). first()
}

function findResources(id) {
}

function add(resource) {
  
}

function update(id, changes) {
  
}

function remove(id) {
  
}