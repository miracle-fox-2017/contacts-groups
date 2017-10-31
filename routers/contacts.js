const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const Contact = require('../models/contacts')
const ContactGroup = require('../models/contactgroups')
const Groups = require('../models/groups')
const Addresses = require('../models/addresses')

const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  // Contact.findAll((err, contacts) => {
  //   Groups.findAll((err, groupsname) => {
  //     ContactGroup.findAllwithGroup(contacts, (err, contactsgroup) => {
  //       res.render('contacts', {data: contactsgroup, groupsname: groupsname, error:''})
  //     })
  //   })
  // })
  ContactGroup.findAllwithGroup().then((group) => {
    res.send(group)
  })
})

router.post('/', (req, res) => {
  if(req.body.name == "") {
    Contact.findAll((err, contacts) => {
      Groups.findAll((err, groupsname) => {
        ContactGroup.findAllwithGroup(contacts, (err, contactsgroup) => {
          res.render('contacts', {data: contactsgroup, groupsname: groupsname, error:'nama tidak boleh kosong'})
        })
      })
    })
  }
  else {
    Contact.create(req.body, (err, last) => {
      ContactGroup.create(last, req.body)
      res.redirect('/contacts')
    })
  }
})

router.get('/delete/:id', (req, res) => {
  Contact.remove(req.params.id).then(() => {
    res.redirect('/contacts')
  })
})


router.get('/edit/:id', (req, res) => {
  Contact.findById(req.params.id).then((contactsbyid) => {
    res.render('contactsedit', {data: contactsbyid})
  })
})


router.post('/edit/:id', (req, res) => {
  Contact.update(req.params.id, req.body).then(() => {
    res.redirect('/contacts')
  })
})


router.get('/addresses/:id', (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    Addresses.findWhere('ContactId', 6)
    .then((addresses) => {
      res.render('contactaddress', {contact: contact, addresses: addresses})
    })
  })
})

router.post('/addresses/:id', (req, res) => {
  Addresses.createbycontact(req.params.id, req.body).then(() => {
    res.redirect('/contacts')
  })
})


module.exports = router
