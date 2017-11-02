const express = require('express')
const router = express.Router();

const Address = require('../models/addresses');

router.get('/', function(req, res){
  Address.AddressWithContact(function(err, rowsAddress) {
    res.render('addresses_with_contact', {dataAddress : rowsAddress})
  })
})


module.exports = router
