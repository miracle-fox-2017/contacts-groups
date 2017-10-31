var express = require('express');
var router = express.Router();

//require models
const Contact = require('../models/contact');
// const Group = require('../models/group');
// const Profile = require('../models/profile');
const Address = require('../models/address');
// const ContactGroup = require('../models/contactgroup');

//GET ADDRESSES
router.get('/', function (req, res) {
  // let showAddresses = `SELECT * FROM Addresses`;
  Contact.showContacts(function(contacts){
    Address.addressJoin(function(addressjoin){
        res.render('addresses',{"rows": addressjoin, "contacts": contacts});
    })
  })
  
})

//POST ADDRESSES
router.post('/', function (req, res) {
  Address.insertAddress(req.body, function(){
    res.redirect('/addresses');
  })

})

//GET ADDRESSES EDIT
router.get('/edit/:id', function (req, res) {
  Contact.showContacts(function(contact){
    Address.addressJoinId(req.params.id, function(addressjoin){
      res.render('addresses_edit',{"rows": addressjoin, "contacts": contact});
    })
  })

})

//POST ADDRESSES EDIT
router.post('/edit/:id', function (req, res){
  Address.updateAddress(req.body, function(){
    res.redirect('/addresses');
  })
  
})

//GET DELETE ID
router.get('/delete/:id', function (req, res){
  Address.deleteAddress(req.params.id, function(){
    res.redirect('/addresses');
  })
})

router.get('/addresses_with_contact', function (req, res){
  Contact.showContacts(function(contacts){
    Address.addresses_with_contact(contacts, function(rows, contacts){
      res.render('addresses_with_contact',{"rows": rows, "contacts": contacts});  
    })
  })
  
})

module.exports = router;