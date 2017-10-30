const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const Groups = require('../models/groups')
const ContactGroup = require('../models/contactgroups')
const Contact = require('../models/contacts')

const router = express.Router()
const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  Groups.findAll((err, groups) => {
    ContactGroup.findAllwithContact(groups, (group) => {
      res.render('groups', {data: group})
    })
  })
})

router.post('/', (req, res) => {
  Groups.create(req.body)
  res.redirect('/groups')
})

router.get('/edit/:id', (req, res) => {
  Groups.findByid(req.params.id, (err, groupsedit) => {
    res.render('groupsedit', {data:groupsedit})
  })
})

router.post('/edit/:id', (req, res) => {
  // db.all(`UPDATE Groups SET name_of_group = "${req.body.name_of_group}" WHERE id = "${req.params.id}"`)
  Groups.update(req.params.id, req.body)
  res.redirect('/groups')
})

router.get('/delete/:id', (req, res) => {
  Groups.remove(req.params.id)
  res.redirect('/groups')
})

router.get('/assign_contacts/:id', (req, res) => {
  Contact.findAll((err, contact) => {
    Groups.findByid(req.params.id, (err, group) => {
      res.render('groupassigned', {contact:contact, group:group})
    })
  })
})

router.post('/assign_contacts/:id', (req, res) => {
  ContactGroup.assignedContact(req.params.id, req.body)
  res.redirect('/groups')
})

module.exports = router;
