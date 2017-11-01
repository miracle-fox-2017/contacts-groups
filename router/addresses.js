const express = require('express');
const router = express.Router();
const addresses = require('../models/addresses');


//Addresses
router.get('/addresses',function(req,res){
  addresses.findAll(function(err,rows) {
    console.log(rows);
    res.render('addresses',{rows})
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
     res.redirect('/addresses')
   })
})

//edit
router.get('/addresses/edit/:id',function(req,res) {
addresses.findById(req.params.id,function(err,rows) {
  res.render('editaddresses',{rows})
  })
})

router.post('/addresses/edit/:id',function(req,res) {
  addresses.update(req.body,req.params.id);
  res.redirect('/addresses')
})

module.exports = router;
