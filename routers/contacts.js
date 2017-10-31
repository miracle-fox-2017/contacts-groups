const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')
const Group = require('../models/groups')
const ContactGroup = require('../models/contactsGroups')

router.get('/', (req, res) => {
  ContactGroup.contactGroupsAll().then(contactGroups => {
    res.render('contacts', {title:'Contacts', contacts:contactGroups})
  })
})

function addRender(req,res,err){
  Group.getAll().then(groupsData => {
    res.render('contacts/add', {title:'Add Contact', groups:groupsData, err:err})
  })
}

router.get('/add', (req, res) => {
  addRender(req,res)
})

router.post('/add', (req, res) => {
  Contact.create(req.body).then(lastID => {
    ContactGroup.create(lastID,req.body.group_id).then(() => {
      res.redirect('/contacts')
    })
  }).catch(err => {
    addRender(req,res,err);
  })
})

router.get('/edit/:id', (req, res) => {
  Contact.getOne(req.params.id).then(contact => {
    res.render('contacts/edit', {title:'Edit Contact', contact:contact});
  }).catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  Contact.update(req.body, req.params.id).then(() => {
    res.redirect('/contacts')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  Contact.destroy(req.params.id).then(() => {
    res.redirect('/contacts')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/addresses/:id', (req, res) => {
  Contact.contactAddresses(req.params.id).then(contactAdd => {
    res.render('contacts/addresses', {title:'Address Contact', contact:contactAdd})
  })
})

module.exports = router;
