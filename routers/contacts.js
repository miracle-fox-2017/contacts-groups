var express = require('express');
var router = express.Router();

//require models
const Contact = require('../models/contact');
const Group = require('../models/group');
// const Profile = require('../models/profile');
// const Address = require('../models/address');
const ContactGroup = require('../models/contactgroup');


//GET CONTACTS
router.get('/', function (req, res) {
  Group.showGroups(function(groups){
    ContactGroup.showContactsGroup(function(cg){
      Contact.showContacts(function(contacts){
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
      })
    })
  })
  
})

//POST CONTACTS
router.post('/', function (req, res) {
  //if name not empty
  if(req.body.name != ''){
    //if ga sama dengan kosong
    Contact.insertContacts(req.body, function(data){
      // console.log(req.body.id_groups);
      ContactGroup.insertContactGroup(data.lastID, req.body.id_groups, function(){
          Group.showGroups(function(groups){
            Contact.showContacts(function(contacts){
              // res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
              res.redirect('/contacts')
            })
          })
        })
      })
  } else {
    // msg = 'Name cannot empty';
    Group.showGroups(function(groups){
      Contact.showContacts(function(contacts){
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": 'Name cannot empty'});      
        // res.redirect('/contacts')
      })
    })
  
  }

})

//GET CONTACTS EDIT
router.get('/edit/:id', function (req, res) {
  Contact.showSpecificId(req.params.id, function(contacts){
    res.render('contacts_edit',{rows: contacts});
  })
  
})

//POST CONTACT EDIT
router.post('/edit/:id', function (req, res){
  Contact.updateContact(req.body, function(){
    Contact.showSpecificId(req.params.id, function(contacts){
      res.render('contacts_edit',{rows: contacts});
    })
  })
  
})

//GET DELETE ID
router.get('/delete/:id', function (req, res){
  Contact.deleteContact(req.params.id, function(){
    res.redirect('/contacts');
  })
})

module.exports = router;