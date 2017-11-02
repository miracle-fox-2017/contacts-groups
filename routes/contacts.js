const express = require('express')
const router = express.Router();

const Contact = require('../models/contacts');

router.get('/', function(req, res){
  Contact.findAll(function(err, rowsContacts){
    res.render('contacts', {rowsContacts})
  })
})

router.post('/', function(req, res){
  Contact.addContact(req.body, function(err){
    if(err){
      res.send('nama tidak boleh kosong')
    }
    else{
      res.redirect('/contacts')
    }
  })
})

router.get('/edit/:id', function(req, res){
  Contact.formEditContact(req.params.id, function(rowsEdit){
    res.render('editContacts', {rowsEdit})
  })
})

router.post('/edit/:id', function(req, res){
  Contact.editContact(req.params.id, req.body)
  res.redirect('/contacts')
})

router.get('/delete/:id', function(req, res){
  Contact.deleteContact(req.params.id)
  res.redirect('/contacts')
})

module.exports = router
