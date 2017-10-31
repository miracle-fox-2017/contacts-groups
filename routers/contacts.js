const express = require('express')
const Contact = require('../models/contacts')
const Group = require('../models/groups')
const ContactGroup = require('../models/contactsGroups')

const router = express.Router()

// define the contacts page route
router.get('/', function(req, res) {
  Promise.all([
    Contact.findAll(),
    ContactGroup.findWithGroups()
  ]).then((allData) => {
    let dataContacts = allData[0]
    let dataContactGroups = allData[1]
    dataContacts.forEach((dataContact) => {
      dataContact.name_of_group = []
      dataContactGroups.forEach((dataContactGroup) => {
        if(dataContact.id == dataContactGroup.contactId) {
          dataContact.name_of_group.push(dataContactGroup.name_of_group)
        }
      })
    })
    res.render('contacts/index',{title: 'My Contacts App | Contacts Page', dataContacts: dataContacts})
    // res.send(dataContacts)
  })
})

router.get('/add', function(req, res) {
  Group.findAll().then((rowGroups) => {
    res.render('contacts/add', {title: 'My Contacts App | Add Contact', error: false, dataGroups: rowGroups})
  })
})

router.post('/add', function(req, res) {
  if(req.body.name == '') {
    res.render('contacts/add', {error: true})
  } else {
    Contact.create(req.body).then((contactId) => {
      ContactGroup.create(contactId, req.body.groupId).then(() => {
        res.redirect('/contacts')
      })
    })
  }
})

router.get('/edit/:id', function(req, res) {
  Contact.findById(req.params.id).then((rowContact) => {
    res.render('contacts/edit', {title: 'My Contacts App | Edit Contact', dataContact: rowContact})
  })
})

router.post('/edit/:id', function(req, res) {
  Contact.update(req.body, req.params.id).then(() => {
    res.redirect('/contacts')
  })
})

router.get('/delete/:id', function(req, res) {
  Contact.remove(req.params.id).then(() => {
    res.redirect('/contacts')
  })
})

module.exports = router
