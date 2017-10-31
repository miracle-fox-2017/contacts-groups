const express = require('express');
const router = express.Router();

const Contact = require('../models/contact')

router.get('/contacts', function (req, res) {
  Contact.findAll(function(rows){
      res.render('contacts', {rows})
  })
})

router.post('/contacts', function (req, res) {
  // console.log(req.body);
  Contact.create(req.body)
  res.redirect('/contacts');
})

router.get('/contacts/edit/:id', function (req, res) {
  // console.log(req.params);
  Contact.findID(req.params.id, function(rows){
  res.render('contactedit', {rows})
  })
})

router.post('/contacts/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Contact.update(req.body,req.params.id);
  res.redirect('/contacts');
})

router.get('/contacts/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Contact.remove(req.params.id);
  res.redirect('/contacts');
})

module.exports = router
