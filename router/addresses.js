const express = require('express');
const router = express.Router();
const addresses = require('../models/addresses');
const contact = require('../models/contacts')


//Addresses
router.get('/addresses',function(req,res){
  addresses.findAllWithContact(function(err,rows) {
    contact.findAll(function(req,dataCon) {
      console.log(rows)
      res.render('addresses',{rows :rows,dataCon:dataCon})
      })
    })
  })

//add
router.post('/addresses',function(req,res) {
  addresses.create(req.body,function(err,rows) {
    res.redirect('/addresses')
  })
})

//delete
router.get('/addresses/delete/:id',function(req,res) {
   addresses.remove(req.params.id,function(err,rows) {
     res.send('ooooooo')
    //  res.redirect('/addresses')
   })
})

//edit
router.get('/addresses/edit/:id',function(req,res) {
  addresses.findById(req.params.id,function(err,rows) {
    contact.findAll(function(err,dataCon) {
      res.render('editaddresses',{rows: rows,dataCon:dataCon})
    })
  })
})

router.post('/addresses/edit/:id',function(req,res) {
  addresses.update(req.body,req.params.id);
  res.redirect('/addresses')
})

module.exports = router;
