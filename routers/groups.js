const express = require('express')
const Group = require('../models/groups')
const Contact = require('../models/contacts')
const ContactGroup = require('../models/contactsGroups')

const router = express.Router()

// define the groups page route
router.get('/', function(req, res) {
  Group.findAll((errGroups, rowsGroups) => {
    ContactGroup.findWithContacts((errContactGroups, rowsContactGroups) => {
      rowsGroups.forEach((rowsGroup) => {
        rowsGroup.name = []
        rowsContactGroups.forEach((rowsContactGroup) => {
          if(rowsGroup.id == rowsContactGroup.groupId) {
            rowsGroup.name.push(rowsContactGroup.name)
          }
        })
      })
      // res.send(rowsGroups)
      res.render('groups', {title: 'My Contacts App | Groups Page', dataGroups: rowsGroups})
    })
  })
})

router.get('/add', function(req, res) {
  res.render('groups/add', {title: 'My Contacts App | Add Group'})
})

router.post('/add', function(req, res) {
  Group.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

router.get('/edit/:id', function(req, res) {
  Group.findById(req.params.id, (err, rows) => {
    res.render('groups/edit', {title: 'My Contacts App | Edit Group', dataContact: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Group.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

router.get('/delete/:id', function(req, res) {
  Group.remove(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/groups')
  })
})

router.get('/assign_contacts/:id_group', function(req, res) {
  Group.findById(req.params.id_group, (errGroup, rowsGroup) => {
    Contact.findAll((errContacts, rowsContacts) => {
      res.render('groups/assign_contacts', {title: 'My Contacts App | Assign Contacts', dataGroup: rowsGroup, dataContacts: rowsContacts})
    })
  })
})

router.post('/assign_contacts/:id_group', function(req, res) {
  ContactGroup.create(req.body.contactId, req.params.id_group, (err) => {
    res.redirect('/groups')
  })
})

module.exports = router
