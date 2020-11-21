// build your `/api/resources` router here
const express = require('express');
const resources = require('./model')
const router = express.Router()
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  resources.find()
    .then(resources => {
      res.json(resources)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.get('/:id', validateId, (req, res) => {
  resources.findById(id)
    .then(resource => {
      res.json(resource)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.post('/', validateBody, [check('name').isLength({min:1})], (req, res) => {

  const errors = validationResult(req)
  const error = !errors.isEmpty()

  if(error){
    res.json({ errors: errors.array() })
  }

  else{

    const newresource = req.body
    resources.add(newresource)
      .then(newresource => {
        res.json(newresource)
      })
      .catch(err => {
        res.json({ message: err })
      })

  }

})

router.put('/:id', validateBody, validateId, (req, res) => {
  const changes = req.body
  const {id} = req.params  
  resources.update(id, changes)
    .then(changes => {
      res.json(changes)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.delete('/:id', validateId, (req, res) => {
  const {id} = req.params
  resources.remove(id)
    .then(deleted => {
      res.json(deleted)
    })
    .catch(err => {
      res.json({ message: err })
    })
})

function validateId(req, res, next) {
  const {id} = req.params
  resources.findById(id)
    .then(resource => {
      if(resource){
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
