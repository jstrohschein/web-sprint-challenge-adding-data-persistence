// build your `Task` model here
const db = require('../../data/dbConfig')


module.exports = {
  find,
  findById,
  add,
  update,
  remove
}


function find() {
  return db('tasks')
}

function findById(id) {
  const task = 
    db('tasks')
      .where({id})
      .first()
  return task
}

async function add(task) {
    const ids = await db('tasks').insert(task)
    const newtask = await findById(ids[0])
    return newtask
  } 

async function update(id, changes) {
  await db('tasks').where({id}).update(changes)
  return await findById(id)
}

async function remove(id) {
  return await db('tasks').where({ id }).del()
}
