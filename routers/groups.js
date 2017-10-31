const express = require('express')
const Group = require('../models/groups')
const Contact = require('../models/contacts')
const ContactGroup = require('../models/contactsGroups')

const router = express.Router()

// define the groups page route
router.get('/', function(req, res) {
  Group.groupWithContact().then((dataGroupWithContact) => {
    res.render('groups', {title: 'My Contacts App | Groups Page', dataGroupWithContact: dataGroupWithContact})
  })
})

router.get('/add', function(req, res) {
  res.render('groups/add', {title: 'My Contacts App | Add Group'})
})

router.post('/add', function(req, res) {
  Group.create(req.body).then(() => {
    res.redirect('/groups')
  })
})

router.get('/edit/:id', function(req, res) {
  Group.findById(req.params.id).then((rowGroup) => {
    res.render('groups/edit', {title: 'My Contacts App | Edit Group', dataGroup: rowGroup})
  })
})

router.post('/edit/:id', function(req, res) {
  Group.update(req.body, req.params.id).then(() => {
    res.redirect('/groups')
  })
})

router.get('/delete/:id', function(req, res) {
  Group.remove(req.params.id).then(() => {
    res.redirect('/groups')
  })
})

router.get('/assign_contacts/:id_group', function(req, res) {
  Group.findById(req.params.id_group).then((rowGroup) => {
    Contact.findAll().then((rowContacts) => {
      res.render('groups/assign_contacts', {title: 'My Contacts App | Assign Contacts', dataGroup: rowGroup, dataContacts: rowContacts})
    })
  })
})

router.post('/assign_contacts/:id_group', function(req, res) {
  ContactGroup.create(req.body.contactId, req.params.id_group).then(() => {
    res.redirect('/groups')
  })
})

module.exports = router
