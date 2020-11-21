
exports.seed = function(knex) {
  return knex('tasks').insert([

    { name: "task 1", task_id: 1, completed: false }, 
    { name: "task 2", task_id: 2, completed: false }, 
    { name: "task 3", task_id: 3, completed: false }, 
    { name: "task 4", task_id: 4, completed: false },
    { name: "task 5", task_id: 5, completed: false }, 
    { name: "task 6", task_id: 6, completed: false }, 
    { name: "task 7", task_id: 7, completed: false }, 
    { name: "task 8", task_id: 8, completed: false },
    { name: 'task 9', task_id: 9, completed: false },
    
  ]);
};
