const express = require('express')
const router = express.Router()
const Address = require('../models/addresses');
const Contact = require('../models/contacts');
// ADDRESSES
router.get('/', (req, res)=>{
  Address.findAllName()
    .then(allAddresses=>{
      return Contact.findAll()
        .then(dataContacts =>{
          res.render('addresses', {rowsAddresses:allAddresses, dataContacts:dataContacts})
        })
    })
      .catch(err=>{
        res.send(err)
      })
})

router.post('/', (req, res)=>{
  Address.create(req.body)
    .then(()=>{
      res.redirect('/addresses')
    })
      .catch(err=>{
        res.send(err)
      })
})

router.get('/edit/:id', (req, res)=>{
  Address.getById(req.params.id)
    .then(dataAddress=>{
      return Contact.findAll()
        .then(dataContacts=>{
          res.render('editAddresses', {dataAddresses:dataAddress,dataContacts:dataContacts})
        })
    })
      .catch(err=>{
        res.send(err)
      })
})

router.post('/edit/:id', (req, res)=>{
  Address.update(req.params.id, req.body)
    .then(()=>{
      res.redirect('/addresses')
    })
      .catch(err=>{
        res.send(err)
      })
})

router.get('/delete/:id', (req, res)=>{
  Address.remove(req.params.id)
    .then(()=>{
      res.redirect('/addresses')
    })
      .catch(err=>{
        res.rend(err)
      })
})


module.exports = router;
