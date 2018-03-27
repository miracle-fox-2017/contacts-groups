
const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')
const Group = require('../models/groups')
const Contacts_Groups = require('../models/contacts_groups')





router.get('/contacts', function (req, res) {
  Contact.findAll().then(dataContacts =>{
    Group.findAll().then(dataGroups => {
     Contacts_Groups.findAll().then(dataContacts_Groups =>{
        res.render('contacts/contacts', {error: null, dataContacts:dataContacts, dataGroups:dataGroups,
          dataContacts_Groups:dataContacts_Groups})
      })
    })
  }).catch(err =>{
    console.log(err);
  })
})


router.post('/contacts', (req, res) =>{
  Contact.create(req).then(data =>{
    let GroupId = req.body.GroupsId
    let ContactId = data.lastID
    Contacts_Groups.create(ContactId,GroupId).then(() =>{
      res.redirect('/contacts')
    })
  }).catch(error =>{
    Contact.findAll().then(dataContacts =>{
      Group.findAll().then(dataGroups =>{
        Contacts_Groups.findAll().then(dataContacts_Groups =>{
          res.render('contacts/contacts', {error:error, dataContacts:dataContacts, dataGroups:dataGroups,
             dataContacts_Groups:dataContacts_Groups})
        })
      })
    })
  })
})



router.get('/contacts/edit/:id', function (req, res) {
  Contact.findById(req).then(dataContacts =>{
    res.render('contacts/edit', {dataContacts:dataContacts})
  }).catch(err =>{
    console.log(err);
  })
});

router.post('/contacts/edit/:id', function (req, res){
  Contact.update(req).then(() =>{
    res.redirect('/contacts')
  })
})

router.get('/contacts/delete/:id', function(req, res){
  Contact.destroy(req).then(() =>{
    res.redirect('/contacts')
  })
})


module.exports = router;
