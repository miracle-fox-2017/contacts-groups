const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')

router.get('/addresses_with_contact',(req,res)=>{
  Address.findAll().then((addressesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      for(let i = 0; i < addressesRows.length; i++){
        for(let j = 0; j < contactsRows.length; j++){
          if(addressesRows[i].name == contactsRows[j].name){
            addressesRows[i].company = contactsRows[j].company
          }
        }
      }
      console.log(addressesRows)
      res.render('addresses_with_contact',{addressesRows})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
module.exports = router
