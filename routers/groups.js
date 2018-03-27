const express = require('express')
const router = express.Router()
const Group = require('../models/groups.js')
const Contact = require('../models/contacts.js')
const Contacts_Groups = require('../models/contacts_groups.js')



router.get('/groups', function(req, res){

  Group.promiseAll().then(dataGroups =>{
     res.render('groups/groups',{dataGroups:dataGroups});
  })
})



router.post('/groups', function(req, res){
  Group.create(req).then(dataGroups =>{
    res.redirect('/groups')
  }).catch(err =>{
    console.log(err);
  })
})

router.get('/groups/edit/:id', (req, res)=>{
  Group.findById(req.params.id).then(dataGroups =>{
    res.render('groups/edit', {dataGroups:dataGroups})
  }).catch(err =>{
    console.log(err);
  })
})

router.post('/groups/edit/:id', (req, res)=>{
  Group.update(req).then(dataGroups =>{
    res.redirect('/groups')
  }).catch(err =>{
    console.log(err);
  })
})


router.get('/groups/delete/:id', (req, res)=>{
  Group.destroy(req).then(dataGroups =>{
    res.redirect('/groups')
  }).catch(err =>{
    console.log(err);
  })
})

router.get('/groups/assign_contacts/:id_group', (req, res) =>{

 Contact.findAll().then(dataContacts =>{
  Group.findById(req.params.id_group).then(dataGroups => {
        res.render('groups/assign_contacts', {dataContacts:dataContacts, dataGroups:dataGroups})
    })
  })
})


router.post('/groups/assign_contacts/:id', (req, res) =>{
   Contacts_Groups.create(req.body.ContactId, req.params.id).then(dataContacts_Groups =>{
     res.redirect('/groups')
   }).catch(err =>{
     console.log(err);
   })
})



module.exports = router;
