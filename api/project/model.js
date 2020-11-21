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

async function add(project) {
    const ids = await db('projects').insert(project)
    const newProject = await findById(ids[0])
    return newProject
  } 

async function update(id, changes) {
  await db('projects').where({id}).update(changes)
  return await findById(id)
}

async function remove(id) {
  return await db('projects').where({ id }).del()
}