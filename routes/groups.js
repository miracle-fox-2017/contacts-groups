const express = require('express')
const router = express.Router()
const Groups = require('../models/groups')
const Contacts = require('../models/contacts')
const ContactsGroups = require('../models/contactsGroups')

router.get('/', (req, res) => {
  Groups.getAll(groupsData => {
    ContactsGroups.getAll(cgData => {
      Contacts.getAll(contactsData => {
        groupsData.forEach(group => {
          group.members = []
          cgData.forEach(cg => {
            contactsData.forEach(contact => {
              if(group.id == cg.group_id && contact.id == cg.contact_id){
                group.members.push(contact.name)
              }
            })
          })
        })
        res.render('groups', {title:'Groups', groups:groupsData})
      })
    })
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

router.get('/assign_contacts/:id_group', (req,res) => {
  Groups.getOne(req.params.id_group,group => {
    Contacts.getAll(contactsData => {
      res.render('groups/assign-contact',{title:'Assign Contacts',group:group,contacts:contactsData})
    })
  })
})

router.post('/assign_contacts/:id_group', (req,res) => {
  ContactsGroups.create(req.body.contact_id,req.params.id_group,report => {
    if(report == true){
      res.redirect('/groups')
    }
  })
})

module.exports = router;
