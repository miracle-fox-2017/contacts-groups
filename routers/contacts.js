const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')
const Address = require('../models/addresses')
const Group = require('../models/groups')
const ContactGroup = require('../models/contactsGroups')

router.get('/', (req, res) => {
  Contact.getAll((err, contactsData) => {
    ContactGroup.getAll((err,cgData) => {
      Group.getAll((err, groupsData) => {
        contactsData.forEach(contact => {
          contact.groups = []
          cgData.forEach(cg => {
            groupsData.forEach(group => {
              if(contact.id == cg.contact_id && group.id == cg.group_id){
                contact.groups.push(group.name_of_group)
              }
            })
          })
        })
        res.render('contacts', {title:'Contacts', contacts:contactsData})
      })
    })
  })
})

function addRender(req,res,err){
  Group.getAll((err, groupsData) => {
    res.render('contacts/add', {title:'Add Contact', groups:groupsData, err:err})
  })
}

router.get('/add', (req, res) => {
  addRender(req,res)
})

router.post('/add', (req, res) => {
  Contact.create(req.body, (err, lastID)=> {
    if(!err){
      ContactGroup.create(lastID,req.body.group_id,err => {
        if(!err){
          res.redirect('/contacts')
        }else{
          res.send(err)
        }
      })
    }else{
      addRender(req,res,err);
    }
  })
})

router.get('/edit/:id', (req, res) => {
  Contact.getOne(req.params.id, (err, contact) => {
    res.render('contacts/edit', {title:'Edit Contact', contact:contact});
  })
})

router.post('/edit/:id', (req, res) => {
  Contact.update(req.body, req.params.id, err => {
    if(!err){
      res.redirect('/contacts')
    }else{
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Contact.destroy(req.params.id, err => {
    if(!err){
      res.redirect('/contacts')
    }else{
      res.send(err)
    }
  })
})

router.get('/addresses/:id', (req, res) => {
  Contact.getOne(req.params.id, (err, contact) => {
    Address.getAll((err, addressesData) => {
      contact.addresses = []
      addressesData.forEach(address => {
        if(contact.id == address.contact_id){
          contact.addresses.push(address)
        }
      })
      res.render('contacts/addresses', {title:'Address Contact', contact:contact})
    })
  })
})

module.exports = router;
