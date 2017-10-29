const express = require('express')
const router = express.Router()
const Contacts = require('../models/contacts')
const Addresses = require('../models/addresses')
const Groups = require('../models/groups')
const ContactsGroups = require('../models/contactsGroups')

router.get('/', (req, res) => {
  Contacts.getAll(contactsData => {
    ContactsGroups.getAll(cgData => {
      Groups.getAll(groupsData => {
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
  Groups.getAll(groupsData => {
    res.render('contacts/add', {title:'Add Contact', groups:groupsData, err:err})
  })
}

router.get('/add', (req, res) => {
  addRender(req,res)
})

router.post('/add', (req, res) => {
  // console.log(req.body);
  Contacts.create(req.body, (lastID,report)=> {
    if(report == true){
      ContactsGroups.create(lastID,req.body.group_id,reportCg => {
        if(reportCg == true){
          res.redirect('/contacts')
        }
      })
    }else{
      addRender(req,res,report);
    }
  })
})

router.get('/edit/:id', (req, res) => {
  Contacts.getOne(req.params.id, contact => {
    res.render('contacts/edit', {title:'Edit Contact', contact:contact});
  })
})

router.post('/edit/:id', (req, res) => {
  Contacts.update(req.body, req.params.id)
  res.redirect('/contacts')
})

router.get('/delete/:id', (req, res) => {
  Contacts.destroy(req.params.id)
  res.redirect('/contacts')
})

router.get('/addresses/:id', (req, res) => {
  Contacts.getOne(req.params.id, contact => {
    Addresses.getAll(addressesData => {
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
