const express = require('express');
const router = express.Router();
const addresses = require('../models/addresses');
const contact = require('../models/contacts')


router.get('/addresses_with_contact',function(req,res){
  addresses.addwithcon(function(err,rows) {
    contact.findAll(function(req,dataCon) {
      console.log(rows)
      res.render('addwithcon',{rows :rows,dataCon:dataCon})
      })
    })
  })
module.exports = router;
