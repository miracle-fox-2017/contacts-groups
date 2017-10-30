const express = require('express');
const route = express.Router();
const Address = require('../Model/address');
const Contact = require('../Model/contacts');

route.get('/',(req,res)=>{
  Address.gettable(rowAddress =>{
    Contact.getall(rows =>{
      // res.send({Address : rowAddress,contact : rows})
      res.render('addresses_with_contact',{Address : rowAddress,contact : rows})
    })
  })
})

module.exports = route;
