
const express = require('express')
const router = express.Router()
const Contact = require('../models/contacts')
const Group = require('../models/groups')
const Contacts_Groups = require('../models/contacts_groups')



router.get('/contacts', function (req, res) {
  Contact.findAll(dataContacts =>{
    Group.findAll(dataGroups => {
    res.render('contacts/contacts', {dataContacts:dataContacts, dataGroups:dataGroups})
    });
  })
})


router.post('/contacts', function(req,res){
  Contact.create(req,dataContacts =>{
    res.redirect('/Contacts')
  })
})

router.get('/contacts/edit/:id', function (req, res) {
  Contact.findById(req,dataContacts =>{
    res.render('contacts/edit', {dataContacts:dataContacts})
  });
});

router.post('/contacts/edit/:id', function (req, res) {
  Contact.update(req,dataContacts =>{
    res.redirect('/contacts')
  });
});

router.get('/contacts/delete/:id', function(req, res){
  Contact.destroy(req, dataContacts =>{
    res.redirect('/contacts')
  })

})


module.exports = router;
