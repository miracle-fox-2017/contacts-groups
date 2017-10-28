const express = require('express')
const router = express.Router()
const Groups = require('../models/groups')

router.get('/', (req, res) => {
  Groups.getAll(groupsData => {
    res.render('groups', {title:'Groups', groups:groupsData})
  })
})

router.get('/add', (req, res) => {
  res.render('groups/add', {title:'Add Group'})
})

router.post('/add', (req, res) => {
  Groups.create(req.body)
  res.redirect('/groups')
})

router.get('/edit/:id', (req, res) => {
  Groups.getOne(req.params.id, group => {
    res.render('groups/edit', {title:'Edit Group', group:group});
  })
})

router.post('/edit/:id', (req, res) => {
  Groups.update(req.body, req.params.id)
  res.redirect('/groups')
})

router.get('/delete/:id', (req, res) => {
  Groups.destroy(req.params.id)
  res.redirect('/groups')
})

module.exports = router;
