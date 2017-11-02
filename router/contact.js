const express = require('express');
const router = express.Router();

const contact = require('../models/contact')

router.get('/contacts', function (req, res) {
  contact.findAll(function(rows){
      res.render('contacts', {rows})
  })
})

router.post('/contacts', function (req, res) {
  // console.log(req.body);
  contact.create(req.body)
  res.redirect('/contacts');
})

router.get('/contacts/edit/:id', function (req, res) {
  // console.log(req.params);
  contact.findID(req.params.id, function(rows){
  res.render('contactedit', {rows})
  })
})

router.post('/contacts/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  contact.update(req.body,req.params.id);
  res.redirect('/contacts');
})

router.get('/contacts/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  contact.remove(req.params.id);
  res.redirect('/contacts');
})

module.exports = router
