const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')

router.get('/addresses_with_contact',(req,res)=>{
  Address.findAll().then((dataAddress)=>{
    Contact.findAll().then((dataContact)=>{
      for(let i = 0; i < dataAddress.length; i++){
        for(let j = 0; j < dataContact.length; j++){
          if(dataAddress[i].name == dataContact[j].name){
            dataAddress[i].company = dataContact[j].company
          }
        }
      }
      console.log(dataAddress)
      res.render('addresses_with_contact',{dataAddress})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
module.exports = router
