const express = require('express')
const router = express.Router()
const Group = require('../models/groups')
const Contact = require('../models/contacts')
const ContactGroup = require('../models/contactsGroups')

router.get('/', (req, res) => {
  ContactGroup.groupContactsAll().then(groupsData => {
    res.render('groups', {title:'Groups', groups:groupsData})
  })
})

router.get('/add', (req, res) => {
  res.render('groups/add', {title:'Add Group'})
})

router.post('/add', (req, res) => {
  Group.create(req.body).then(() => {
    res.redirect('/groups')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) => {
  Group.getOne(req.params.id).then(group => {
    res.render('groups/edit', {title:'Edit Group', group:group});
  }).catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  Group.update(req.body, req.params.id).then(() => {
    res.redirect('/groups')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  Group.destroy(req.params.id).then(() => {
    res.redirect('/groups')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/assign_contacts/:id_group', (req,res) => {
  Promise.all([
    Group.getOne(req.params.id_group),
    Contact.getAll()
  ]).then(rows => {
    res.render('groups/assign-contact',{title:'Assign Contacts',group:rows[0],contacts:rows[1]})
  }).catch(err => {
    res.send(err)
  })
})

router.post('/assign_contacts/:id_group', (req,res) => {
  ContactGroup.create(req.body.contact_id,req.params.id_group).then(() => {
    res.redirect('/groups')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
