var express = require('express');
var router = express.Router();

//require models
const Contact = require('../models/contact');
const Group = require('../models/group');
// const Profile = require('../models/profile');
const Address = require('../models/address');
const ContactGroup = require('../models/contactgroup');


//GET CONTACTS
router.get('/', function (req, res) {
  Group.showGroups()
  .then(groups=>{
    ContactGroup.showContactsGroup()
    .then(cg=>{
      Contact.showContacts()
      .then(contacts=>{
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});  
      })
    })
  }).catch(err=>{
    console.log(err);
  })
  // Group.showGroups(function(groups){
  //   ContactGroup.showContactsGroup(function(cg){
  //     Contact.showContacts(function(contacts){
  //       res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
  //     })
  //   })
  // })
  
})

//POST CONTACTS
router.post('/', function (req, res) {
  //if name not empty
  if(req.body.name != ''){
    //if ga sama dengan kosong
    Contact.insertContacts(req.body)
    .then((data)=>{
      ContactGroup.insertContactGroup(data.lastID, req.body.id_groups)
      .then(()=>{
        res.redirect('/contacts');
      })
      
    })
  } else {
    Group.showGroups()
    .then((groups)=>{
      Contact.showContacts()
      .then(contacts=>{
        res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": 'Name cannot empty'});        
      })
    })
    //   Group.showGroups(function(groups){
    //     Contact.showContacts(function(contacts){
    //       res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": 'Name cannot empty'});      
    //       // res.redirect('/contacts')
    //     })
    //   })
  
  }
  
  
  
  // //if name not empty
  // if(req.body.name != ''){
  //   //if ga sama dengan kosong
  //   Contact.insertContacts(req.body, function(data){
  //     // console.log(req.body.id_groups);
  //     ContactGroup.insertContactGroup(data.lastID, req.body.id_groups, function(){
  //         Group.showGroups(function(groups){
  //           Contact.showContacts(function(contacts){
  //             // res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": ''});      
  //             res.redirect('/contacts')
  //           })
  //         })
  //       })
  //     })
  // } else {
  //   // msg = 'Name cannot empty';
  //   Group.showGroups(function(groups){
  //     Contact.showContacts(function(contacts){
  //       res.render('contacts', {"rows": contacts, "groups": groups, "cg": cg, "msg": 'Name cannot empty'});      
  //       // res.redirect('/contacts')
  //     })
  //   })
  // 
  // }

})

//GET CONTACTS EDIT
router.get('/edit/:id', function (req, res) {
  Contact.showSpecificId(req.params.id)
  .then((contacts)=>{
    res.render('contacts_edit',{rows: contacts});
  }).catch(err=>{
    console.log(err);
  })
  // Contact.showSpecificId(req.params.id, function(contacts){
  //   res.render('contacts_edit',{rows: contacts});
  // })
  
})

//POST CONTACT EDIT
router.post('/edit/:id', function (req, res){
  Contact.updateContact(req.body)
  .then(()=>{
    Contact.showSpecificId(req.params.id)
    .then(contacts=>{
      res.render('contacts_edit',{rows: contacts});
    })
  }).catch(err=>{
    console.log(err);
  })
  
  // Contact.updateContact(req.body, function(){
  //   Contact.showSpecificId(req.params.id, function(contacts){
  //     res.render('contacts_edit',{rows: contacts});
  //   })
  // })
  
})

//GET DELETE ID
router.get('/delete/:id', function (req, res){
  Contact.deleteContact(req.params.id)
  .then(()=>{
    res.redirect('/contacts');
  }).catch(err=>{
    console.log(err);
  })
  // Contact.deleteContact(req.params.id, function(){
  //   res.redirect('/contacts');
  // })
})

//GET SPECIFIC ADDRESS
router.get('/address/:id', function(req, res){
  // res.send(`haloooo ${req.params.id}`)
  Contact.showSpecificId(req.params.id)
  .then(contact=>{
    Address.showAddress()
    .then(address=>{
      Address.addressWithContact(contact, address)
      .then(addresses=>{
        // console.log(address);
        res.render('addresses_with_contact', {"contact": contact, "addresses": addresses})
      })
    })
  }).catch(err=>{
    console.log(err);
  })
})

//POST SPECIFIC ADDRESS
router.post('/address/:id', function(req, res){
  // console.log(req.body);
  Address.insertAddress(req.body)
  .then(cb=>{
    res.redirect(`/contacts/address/${req.params.id}`)
  })
})

module.exports = router;