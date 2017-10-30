const express = require('express')
const router = express.Router()
const Group = require('../models/groups.js')
const Contact = require('../models/contacts.js')
const Contacts_Groups = require('../models/contacts_groups.js')

router.get('/groups', function(req, res){
  Group.findAll(dataGroups => {
    Contact.findAll(dataContacts =>{
      Contacts_Groups.findAll(dataContacts_Groups =>{
        dataGroups.forEach(group =>{
          group.arrName = []
          dataContacts.forEach(contact =>{
            dataContacts_Groups.forEach(cg =>{
              if(contact.id == cg.ContactsId && group.id == cg.GroupsId){
                group.arrName.push(contact.name)
              }
            })
          })
        })
        res.render('groups/groups',{dataGroups:dataGroups});
      })
    })
  })
})


router.post('/groups', function(req, res){
  Group.create(req, dataGroups=>{
    res.redirect('/groups')
  })
})

router.get('/groups/edit/:id', (req, res)=>{
  Group.findById(req.params.id, dataGroups =>{
    res.render('groups/edit', {dataGroups:dataGroups})
  })
})

router.post('/groups/edit/:id', (req, res)=>{
  Group.update(req, dataGroups =>{
    res.redirect('/groups')
  })
})


router.get('/groups/delete/:id', (req, res)=>{
  Group.destroy(req, dataGroups =>{
    res.redirect('/groups')
  })
})

router.get('/groups/assign_contacts/:id_group', (req, res) =>{

 Contact.findAll(dataContacts =>{
  Group.findById(req.params.id_group, dataGroups => {
        res.render('groups/assign_contacts', {dataContacts:dataContacts, dataGroups:dataGroups})
    })
  })
})


router.post('/groups/assign_contacts/:id', (req, res) =>{
   Contacts_Groups.create(req.body.ContactId, req.params.id, dataContacts_Groups =>{
     res.redirect('/groups')
   })
})



module.exports = router;
