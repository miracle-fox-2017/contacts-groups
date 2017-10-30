const express = require('express')
const router = express.Router()
const Address = require('../models/addresses');
const Contact = require('../models/contacts');
// ADDRESSES
router.get('/', (req, res)=>{
  // res.send('Test masuk ke get')
  Address.findAll((err, dataAddresses)=>{
    if(!err){
      let count = 0
          dataAddresses.forEach((row, index) => {
            // get contact by row.contact_id
            Contact.getById(row.ContactsId, (err, dataContact)=>{
              if(row.ContactsId){
                row.name = dataContact.name
              }
              Contact.findAll((err, dataContacts)=>{
                if(!err){
                  if(index == dataAddresses.length - 1){
                    res.render('addresses', {rowsAddresses:dataAddresses, dataContacts:dataContacts})
                  }
                } else {
                  console.log(err);
                  res.send(err)
                }
              })
            })
          })
    } else {
      console.log(err);
      res.send(err)
    }

  })
})

router.post('/', (req, res)=>{
  // console.log('-----------',req.body);
  Address.create(req.body)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res)=>{
  Address.getById(req.params.id ,(err, dataAddress)=>{
    if(!err){
      Contact.findAll((err, dataContacts)=>{
        if(!err){
          res.render('editAddresses', {dataAddresses:dataAddress,dataContacts:dataContacts})
        }
      })
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  Address.update(req.params.id, req.body, (err)=>{
    if(!err){
      res.redirect('/addresses')
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Address.remove(req.params.id, err =>{
    if(!err){
      res.redirect('/addresses')
    }
  })
})


module.exports = router;
