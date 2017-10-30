const express = require('express')
const router = express.Router()
const Group = require('../models/groups')
const Contact = require('../models/contacts')
const ContactGroup = require('../models/contactsGroups')

router.get('/', (req, res) => {
  Group.getAll((err, groupsData) => {
    ContactGroup.getAll((err, cgData) => {
      Contact.getAll((err, contactsData) => {
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
  Group.create(req.body, err => {
    if(!err){
      res.redirect('/groups')
    }else{
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res) => {
  Group.getOne(req.params.id, (err, group) => {
    if(!err){
      res.render('groups/edit', {title:'Edit Group', group:group});
    }else{
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res) => {
  Group.update(req.body, req.params.id, err => {
    if(!err){
      res.redirect('/groups')
    }else{
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Group.destroy(req.params.id, err => {
    if(!err){
      res.redirect('/groups')
    }else{
      res.send(err)
    }
  })
})

router.get('/assign_contacts/:id_group', (req,res) => {
  Group.getOne(req.params.id_group, (err, group) => {
    if(!err){
      Contact.getAll((err, contactsData) => {
        res.render('groups/assign-contact',{title:'Assign Contacts',group:group,contacts:contactsData})
      })
    }else{
      res.send(err)
    }
  })
})

router.post('/assign_contacts/:id_group', (req,res) => {
  ContactGroup.create(req.body.contact_id,req.params.id_group,err => {
    if(!err){
      res.redirect('/groups')
    }else{
      res.send(err)
    }
  })
})

module.exports = router;
