const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const Groups = require('../models/groups')
const ContactGroup = require('../models/contactgroups')
const Contact = require('../models/contacts')

const router = express.Router()
const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  Groups.findAll().then((groups) => {
    ContactGroup.findAllwithContact(groups).then((group) => {
      res.render('groups', {data: group})
    })
  })
})

router.post('/', (req, res) => {
  Groups.create(req.body).then(() => {
    res.redirect('/groups')
  })
})


router.get('/edit/:id', (req, res) => {
  Groups.findByid(req.params.id).then((group) => {
    res.render('groupsedit', {data:group})
  })
})


router.post('/edit/:id', (req, res) => {
  Groups.update(req.params.id, req.body).then(() => {
    res.redirect('/groups')
  })
})


router.get('/delete/:id', (req, res) => {
  Groups.remove(req.params.id).then(() => {
    res.redirect('/groups')
  })
})


router.get('/assign_contacts/:id', (req, res) => {
  Contact.findAll().then((contact) => {
    Groups.findByid(req.params.id).then((group) => {
      res.render('groupassigned', {contact:contact, group:group})
    })
  })
})

router.post('/assign_contacts/:id', (req, res) => {
  ContactGroup.assignedContact(req.params.id, req.body).then(() => {
    res.redirect('/groups')
  })
})


module.exports = router;
