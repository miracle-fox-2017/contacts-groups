const express   = require('express')
const router    = express.Router()
const addresses = require('../models/addresses')
const contacts  = require('../models/contacts')

// READ
router.get('/',function(req,res){
  addresses.findAll_no_join(function(err,data_Addresses){
    if(!err){
      contacts.findAll(function(err,data_Contacts){
        if(!err){
          // res.send(data_Contacts)
          res.render('addresses_with_contact',{data_Addresses:data_Addresses, data_Contacts:data_Contacts})
        }else{
          console.log(err);
        }
      })
    }else{
      console.log(err);
    }
  })
})

module.exports = router
