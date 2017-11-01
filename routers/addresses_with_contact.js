const express = require('express');
const router = express.Router();
const Address = require('../models/address');
const Contact = require('../models/contact');

router.get('/', (req, res)=>{
  Address.findAll((err, dataAddress, dataContact)=>{
    if (!err) {
      dataAddress.forEach(address=>{
        
      })
    }else {
      res.send(err)
    }
  })
})

module.exports = router;
