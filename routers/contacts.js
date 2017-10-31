const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const ContactsGroups = require('../models/Contacts_Groups');
// CONTACTS
router.get('/', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama Email sudah ada, coba Email lainya"
  }
  ContactsGroups.findContacts_Groups()
    .then( AlldataContacts =>{
      return Group.findAll()
        .then(dataGroups =>{
          if(AlldataContacts){
            res.render('contacts',{msgError:msgError,rowsContacts:AlldataContacts,dataGroups:dataGroups})
          }
        })
    })
      .catch(err=>{
        res.send(err)
      })
})

router.post('/', function(req, res){
  Contact.create(req.body)
    .then(idContact =>{
      return ContactsGroups.create(idContact, req.body.GroupsId)
        .then(()=>{
          res.redirect('/contacts')
        })
    })
      .catch(()=>{
        res.redirect('/contacts/?msgError=true')
      })
})

router.get('/delete/:id', (req, res)=>{
  Contact.remove(req.params.id)
    .then(()=>{
      res.redirect('/contacts')
    })
      .catch(err=>{
        res.send(err)
      })
})

module.exports = router;
