const express = require('express')
const router = express.Router()
const Group = require('../models/groups');
const Contact = require('../models/contacts');
const ContactsGroups = require('../models/Contacts_Groups');
// GROUPS
router.get('/', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama grup sudah ada, coba nama lainya"
  }
  Group.findAll((err, rowGroups) =>{
    if(!err){
      res.render('groups', {msgError:msgError,rowsGroups:rowGroups})
    } else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  Group.create(req.body,(err)=>{
    if(!err){
      res.redirect('/groups')
    } else {
      res.redirect('/groups/?msgError=true')
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama grup sudah ada, coba nama lainya"
  }
  Group.getById(req.params.id, (err, dataGroup)=>{
    if(!err){
      res.render('editGroups', {msgError:msgError,dataGroups:dataGroup})
    }else {
      res.send(err)
      console.log(err);
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  Group.update(req.params.id, req.body,(err)=>{
    if(!err){
      res.redirect('/groups')
    } else {
        res.redirect(`/groups/edit/${req.params.id}?msgError=true`)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Group.remove(req.params.id, err =>{
    if(!err){
      res.redirect('/groups')
    } else {
      res.send(err)
    }
  })
})

//ASSIG GROUPS

router.get('/assign_contacts/:id_group', (req, res)=>{
  Group.getById(req.params.id_group, (err, dataGroup) =>{
    if(!err){
      Contact.findAll((err, dataContacts)=>{
        if(!err){
          res.render('assignContacts', {dataGroup:dataGroup, dataContacts:dataContacts})
        } else {
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
})

router.post('/assign_contacts/:id_group', (req, res)=>{
  ContactsGroups.create(req.body.ContactsId, req.params.id_group, (err)=>{
    if(!err){
      res.redirect('/groups')
    } else {
      res.send(err)
    }
  })
})
module.exports = router;
