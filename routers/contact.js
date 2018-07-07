const express = require('express');
const router = express.Router();

//require FILE models
const Contact = require('../models/contact')



//Menampilkan semua data contacts
router.get('/contacts',function(req,res){
  Contact.findAll(function(rowContacts){
    res.render('contacts',{rowContacts})
  })
})
//Menerima input contact
router.post('/contacts',function(req,res){
  Contact.inputContact(req.body)
  res.redirect('/contacts')
})
//Menampilkan data contact spesifik untuk diubah
router.get('/contacts/edit/:id',function(req,res){
  Contact.findID(req.params.id,function(rowContacts){
    res.render('editcontacts',{rowContacts})
  })
})
//Menerima data form untuk update contact
router.post('/contacts/edit/:id',function(req,res){

  Contact.editContact(req.params.id,req.body)
  res.redirect('/contacts')
})
// Menghapus data contact berdasarkan id
router.get('/contacts/delete/:id',function(req,res){
    Contact.deleteContact(req.params.id)
    res.redirect('/contacts')
})


module.exports = router
