const express = require('express');
const router = express.Router();
const contact = require('../models/contacts');


  //Contacts
router.get('/contacts',function(req,res){
contact.findAll(function(err,rows) {
  console.log(rows);
  res.render('contacts',{rows})
  })
})

//add
router.post('/contacts',function(req,res) {
contact.create(req.body,function(err,rows) {
  res.redirect('/contacts')
  })
})

//delete
router.get('/contacts/delete/:id',function(req,res) {
  contact.remove(req.params.id,function(err,rows) {
    res.redirect('/contacts')
  })
})

//edit
router.get('/contacts/edit/:id',function(req,res) {
  contact.findById(req.params.id,function(err,rows) {
    res.render('editcontacts',{rows})
    })
})

router.post('/contacts/edit/:id',function(req,res) {
  contact.update(req.body,req.params.id);
  res.redirect('/contacts')
  })
module.exports = router;
