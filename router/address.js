const express = require('express');
const router = express.Router();

const Address = require('../models/address')

router.get('/addresses', function (req, res) {
  Address.findAll(function(rows)
  {
    // console.log(rows);
    res.render('addresses', {rows})
  })
})

router.post('/addresses', function (req, res) {
  // console.log(req.body);
  Address.create(req.body);
  res.redirect('/addresses');
})

router.get('/addresses/edit/:id', function (req, res) {
  // console.log(req.params);
  Address.findID(req.params.id, function(rows){
    res.render('addressedit', {rows})
  })
})

router.post('/addresses/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Address.update(req.body, req.params.id)
  res.redirect('/addresses');
})

router.get('/addresses/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Address.remove(req.params.id);
  res.redirect('/addresses');
})

module.exports = router