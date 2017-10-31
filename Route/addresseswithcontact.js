const express = require('express');
const route = express.Router();
const Address = require('../Model/address');
const Contact = require('../Model/contacts');

route.get('/',(req,res)=>{
  Address.gettable()
  .then(rowAddress =>{
    let arr = []
    rowAddress.forEach((Address, index)=>{
      Contact.findbyid(Address.ContactID).then(rows =>{

        Address.Name = rows[0].Name;
        Address.Company = rows[0].Company;
        Address.Telp_Number = rows[0].Telp_Number;
        Address.Email = rows[0].Email;
        arr.push(Address)
        if(index === rowAddress.length - 1) {
          res.render('addresses_with_contact',{Address : arr})
        }
      })
    })
    })
    .catch(err => {
      res.send(err)
    })
  })


module.exports = route;
