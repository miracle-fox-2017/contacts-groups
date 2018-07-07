const express = require('express');
const router = express.Router();

//require FILE models
const AddressContact = require('../models/addresscontact');
const Contact =require('../models/contact')


router.get('/addresses_with_contact',function(req,res){
  AddressContact.findAll(function(rowAddresses){
    Contact.findAll(function(rowContacts){
      res.render('addresscontact',{rowAddresses,rowContacts})
    })
  })
})

module.exports= router
