// build your `Resource` model here
const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('resources')
}

function findById(id) {
  const resource = 
    db('resources')
      .where({id})
      .first()
  return resource
}

async function add(resource) {
    const ids = await db('resources').insert(resource)
    const newresource = await findById(ids[0])
    return newresource
  } 

async function update(id, changes) {
  await db('resources').where({id}).update(changes)
  return await findById(id)
}

async function remove(id) {
  return await db('resources').where({ id }).del()
}