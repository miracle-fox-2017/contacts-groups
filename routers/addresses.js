const express = require('express')
const router = express.Router()
const Address = require('../models/addresses.js');

//console.log(Address);
router.get('/addresses', (req, res) => {
  Address.findAll(dataAddress =>{
    res.render('addresses/addresses', {dataAddress:dataAddress})
  })
})

router.post('/addresses', (req, res) => {
  Address.create(req, dataAddress => {
    res.redirect('/addresses')
  })
})

router.get('/addresses/edit/:id', (req, res) => {
  Address.findById(req, dataAddress => {
    res.render('addresses/edit', {dataAddress:dataAddress})
  })
})

router.post('/addresses/edit/:id', (req, res) => {
  Address.update(req, dataAddress => {
  //res.send('hello')
    res.redirect('/addresses')
  })
})

router.get('/addresses/delete/:id', (req, res) => {
  Address.destroy(req, dataAddress => {
    res.redirect('/addresses')
  })
})


module.exports = router;
