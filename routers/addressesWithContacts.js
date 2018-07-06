const express   = require('express')
const router    = express.Router()
const addresses = require('../models/addresses')
const contacts  = require('../models/contacts')

// READ
router.get('/',function(req,res){
  Promise.all([
    addresses.findAll_no_join(),
    contacts.findAll(),
  ]).then(alldata=>{
    res.render('addresses_with_contact',{data_Addresses:alldata[0], data_Contacts:alldata[1]})
  }).catch((err)=>{
    console.log(err,'promise all addresses_with_contact');
  })
})

module.exports = router
