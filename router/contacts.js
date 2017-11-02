const express = require('express');
const router = express.Router();
const contact = require('../models/contacts');


  //Contacts
router.get('/contacts',function(req,res){
contact.findAll(function(err,rows) {
  console.log(rows);
  res.render('contacts',{rows:rows,error:null})
  })
})

//add
router.post('/contacts',function(req,res) {
  if (req.body.name.length == 0 && req.body.company.length == 0 && req.body.telp_number.length == 0 && req.body.email.length == 0) {
      contact.findAll(function(err,rows) {
          res.render('contacts', {error: "masukin data name nya !",rows:rows})
      })
    }
  else {
      contact.create(req.body,function(err,rows) {
        res.redirect('/contacts')
      })
    }
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
