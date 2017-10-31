const express = require('express')
const Contact = require('../models/contacts')
const Group = require('../models/groups')
const ContactGroup = require('../models/contactsGroups')

const router = express.Router()

// define the contacts page route
router.get('/', function(req, res) {
  Contact.findAll((errContact, rowsContacts) => {
    ContactGroup.findWithGroups((errContactGroup, rowsContactGroups) => {
      rowsContacts.forEach((rowsContact) => {
        rowsContact.name_of_group = []
        rowsContactGroups.forEach((rowsContactGroup) => {
          if(rowsContact.id == rowsContactGroup.contactId) {
            rowsContact.name_of_group.push(rowsContactGroup.name_of_group)
          }
        })
      })
      // res.send(rowsContacts)
      res.render('contacts/index',{title: 'My Contacts App | Contacts Page', dataContacts: rowsContacts})
    })
  })
})

router.get('/add', function(req, res) {
  Group.findAll((err, rows) => {
    res.render('contacts/add', {title: 'My Contacts App | Add Contact', error: false, dataGroups: rows})
  })
})

router.post('/add', function(req, res) {
  if(req.body.name == '') {
    res.render('contacts/add', {error: true})
  } else {
    Contact.create(req.body, (err, contactId) => {
      ContactGroup.create(contactId, req.body.groupId, (err) => {
        res.redirect('/contacts')
      })
    })
  }
})

router.get('/edit/:id', function(req, res) {
  Contact.findById(req.params.id, (err, rows) => {
    res.render('contacts/edit', {title: 'My Contacts App | Edit Contact', dataContact: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Contact.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

router.get('/delete/:id', function(req, res) {
  Contact.remove(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

module.exports = router
