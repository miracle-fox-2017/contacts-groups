const express = require('express')
const Group = require('../models/groups')

const router = express.Router()

// define the groups page route
router.get('/', function(req, res) {
  Group.findAll((err, rows) => {
    res.render('groups', {error: err, dataGroups: rows})
  })
})

router.get('/add', function(req, res) {
  res.render('groups/add')
})

router.post('/add', function(req, res) {
  Group.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

router.get('/edit/:id', function(req, res) {
  Group.findById(req.params.id, (err, rows) => {
    res.render('groups/edit', {error: err, dataContact: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Group.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

router.get('/delete/:id', function(req, res) {
  Group.delete(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

module.exports = router
