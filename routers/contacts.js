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
  Contact.findAll((err, dataContacts)=>{
    if(!err){
      ContactsGroups.findContacts_Groups(dataContacts,(err, AlldataContacts)=>{
        if(!err){
          Group.findAll((err, dataGroups)=>{
            if(!err){
              if(AlldataContacts){
                res.render('contacts',{msgError:msgError,rowsContacts:AlldataContacts,dataGroups:dataGroups})
              }
            }
          })
        }
      })
    }
  })
})

router.post('/', function(req, res){
  Contact.create(req.body, function(err, idContact){
    if(!err){
      ContactsGroups.create(idContact, req.body.GroupsId, (err)=>{
        if(!err){
          res.redirect('/contacts')
        } else {
          res.send(err)
        }
      })
    } else {
      res.redirect('/contacts/?msgError=true')
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Contact.remove(req.params.id, (err)=>{
    if(!err){
      res.redirect('/contacts')
    } else {
      res.send(err)
    }
  })
})

module.exports = router;
