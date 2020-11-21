// build your `/api/projects` router here
const express = require('express');
const projects = require('./model')
const router = express.Router()
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  projects.find()
    .then(projects => {
      res.json(projects)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.get('/:id', validateId, (req, res) => {
  const {id} = req.params
  projects.findById(id)
    .then(project => {
      res.json(project)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.post('/', validateBody, [check('name').isLength({min:1})], (req, res) => {
  const newProject = req.body
  projects.add(newProject)
    .then(newProject => {
      res.json(newProject)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.put('/:id', validateBody, validateId, (req, res) => {
  const changes = req.body
  const {id} = req.params  
  projects.update(id, changes)
    .then(changes => {
      res.json(changes)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.delete('/:id', validateId, (req, res) => {
  const {id} = req.params
  projects.remove(id)
    .then(deleted => {
      res.json(deleted)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

function validateId(req, res, next) {
  const {id} = req.params
  projects.findById(id)
    .then(project => {
      if(project){
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