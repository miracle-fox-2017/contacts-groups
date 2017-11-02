const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')

router.get('/addresses_with_contact/:id',(req,res)=>{
  let id =req.params.id
  Address.findAll().then((addressesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      for(let i = 0; i < addressesRows.length; i++){
        for(let j = 0; j < contactsRows.length; j++){
          if(addressesRows[i].name == contactsRows[j].name){
            addressesRows[i].company = contactsRows[j].company

          }
        }
      }
      let addresses_with_contactRows = []
      for(let k = 0; k < addressesRows.length; k++){
        if(addressesRows[k].contacts_id==id){
          addresses_with_contactRows.push(addressesRows[k])
        }
      }

      res.render('addresses_with_contact',{addresses_with_contactRows})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
module.exports = router
