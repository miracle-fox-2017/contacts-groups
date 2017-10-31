var express = require('express');
var router = express.Router();

//require models
const Contact = require('../models/contact');
const Group = require('../models/group');
// const Profile = require('../models/profile');
// const Address = require('../models/address');
const ContactGroup = require('../models/contactgroup');

//GET GROUPS
router.get('/', function (req, res) {
  ContactGroup.contactGroupJoin()
  .then(cg=>{
    Group.showGroups()
    .then(groups=>{
      res.render('groups',{"rows": groups, "cg": cg});
    })
  }).catch(err=>{
    console.log(err);
  })
  // ContactGroup.contactGroupJoin(function(cg){
  //   Group.showGroups(function(groups){
  //     res.render('groups',{"rows": groups, "cg": cg});
  //   })
  // })
  
})

//POST GROUPS
router.post('/', function (req, res) {
  Group.insertGroups(req.body)
  .then(()=>{
    res.redirect('/groups');
  }).catch(err=>{
    console.log(err);
  })
  // Group.insertGroups(req.body, function(){
  //   Group.showGroups(function(){
  //     // res.render('groups',{"rows": groups, "cg": cg});
  //     res.redirect('/groups');
  //   })
  // })

})

//GET GROUPS EDIT
router.get('/edit/:id', function (req, res) {
  Group.showSpecificId(req.params.id)
  .then(group=>{
    res.render('groups_edit',{rows: group});
  }).catch(err=>{
    console.log(err);
  })
  // Group.showSpecificId(req.params.id, function(group){
  //   res.render('groups_edit',{rows: group});
  //   
  // })
  
})

//POST GROUPS EDIT
router.post('/edit/:id', function (req, res){
  Group.updateGroups(req.body)
  .then(()=>{
    Group.showSpecificId(req.params.id)
    .then(group=>{
      res.render('groups_edit',{rows: group});
    })
  }).catch(err=>{
    console.log(err);
  })
  // Group.updateGroups(req.body, function(){
  //   Group.showSpecificId(req.params.id, function(group){
  //     res.render('groups_edit',{rows: group});
  //     
  //   })
  // })
  
})

//GET DELETE ID
router.get('/delete/:id', function (req, res){
  Group.deleteGroups(req.params.id)
  .then(()=>{
    res.redirect('/groups');
  }).catch(err=>{
    console.log(err);
  })
  // Group.deleteGroups(req.params.id, function(){
  //   res.redirect('/groups');
  // })
  
})

//release 11
router.get('/assign_contacts/:id_group', function (req, res) {
  Contact.showContacts()
  .then(contacts=>{
    Group.showSpecificId(req.params.id_group)
    .then(groups=>{
      res.render('groupassign',{"rows": groups, "contacts": contacts});
    })
  }).catch(err=>{
    console.log(err);
  })

  // Contact.showContacts(function(contacts){
  //   Group.showSpecificId(req.params.id_group, function(groups){
  //     res.render('groupassign',{"rows": groups, "contacts": contacts});
  //   })
  // })

})

router.post('/assign_contacts/:id_group', function (req, res){
  ContactGroup.insertContactGroup(req.body.id_contacts, req.body.id_groups)
  .then(()=>{
    res.redirect('/groups');
  }).catch(err=>{
    console.log(err);
  })
  // ContactGroup.insertContactGroup(req.body.id_contacts, req.body.id_groups, function(){
  //   res.redirect('/groups');
  // })
  
})

//unasign group
router.get('/unassign_contacts/:id_group', function (req, res) {
  Contact.showContacts()
  .then(contacts=>{
    Group.showSpecificId(req.params.id_group)
    .then(groups=>{
      res.render('groupunassign',{"rows": groups, "contacts": contacts});
    })
  }).catch(err=>{
    console.log(err);
  })
  
  // Contact.showContacts(function(contacts){
  //   Group.showSpecificId(req.params.id_group, function(groups){
  //     res.render('groupunassign',{"rows": groups, "contacts": contacts});
  //     
  //   })
  // })

})

router.post('/unassign_contacts/:id_group', function (req, res){
  ContactGroup.unassign_contacts(req.body)
  .then(()=>{
    res.redirect('/groups');
  }).catch(err=>{
    console.log(err);
  })
  // ContactGroup.unassign_contacts(req.body, function(){
  //   res.redirect('/groups');
  // })
  
})


module.exports = router;