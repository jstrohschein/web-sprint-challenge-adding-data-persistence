// build your `/api/tasks` router here
const express = require('express');
const tasks = require('./model')
const router = express.Router()
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  tasks.find()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.get('/:id', validateId, (req, res) => {
  const {id} = req.params
  tasks.findById(id)
    .then(task => {
      res.json(task)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.post('/', validateBody, [check('name').isLength({min:1})], (req, res) => {
  const newtask = req.body
  tasks.add(newtask)
    .then(newtask => {
      res.json(newtask)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.put('/:id', validateBody, validateId, (req, res) => {
  const changes = req.body
  const {id} = req.params  
  tasks.update(id, changes)
    .then(changes => {
      res.json(changes)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.delete('/:id', validateId, (req, res) => {
  const {id} = req.params
  tasks.remove(id)
    .then(deleted => {
      res.json(deleted)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

function validateId(req, res, next) {
  const {id} = req.params
  tasks.findById(id)
    .then(task => {
      if(task){
        next()
      }
      else{
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
  
}

function validateBody(req, res, next) {
  const body = req.body
  if(req.body && Object.keys(req.body).length > 0){
    next()
  }else{
    res.status(400).json({ message: 'You forgot the body' })
  }
}

module.exports = router