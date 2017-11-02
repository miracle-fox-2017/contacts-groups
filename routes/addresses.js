const express = require('express')
const router = express.Router();

const Address = require('../models/addresses');

router.get('/', function(req, res){
  Address.findAll(function(err, rowsAddress) {
  res.render('addresses', {rowsAddress})
  })
})

router.post('/', function(req, res){
  Address.addAddress(req.body)
  res.redirect('./addresses')
})

router.get('/edit/:id', function(req, res){
  Address.formEditAddress(req.params.id, function(err, rowsEditAddress){
    res.render('editAddresses', {rowsEditAddress})
  })
})

router.post('/edit/:id', function(req, res){
  Address.editAddress(req.params.id, req.body)
  res.redirect('/addresses')
})

router.get('/delete/:id', function(req, res){
  Address.hapusAddress(req.params.id)
  res.redirect('/addresses')
})

module.exports = router
