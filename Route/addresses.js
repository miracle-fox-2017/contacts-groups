const express = require('express')
const bodyParser = require('body-parser')
const Address = require('../Model/address');
const Contact = require('../Model/contacts');

var route = express.Router()

route.get('/',(req,res)=>{
  Contact.getall(rowstable =>{
    Address.getall(rows=>{
      res.render('addresses',{address : rows,contact :rowstable,error:[]})
    // res.send(rows)
    })
  })
})

route.post('/',(req,res)=>{
  if (req.body.street === "" || req.body.street === ""){
        // res.send({profile : rows,contact :rowstable,error:["Error namasudah ada"]})
    Contact.getall(rowstable =>{
      Address.getall(rows=>{
        res.render('addresses',{address : rows,contact :rowstable,error:["Error Tidak Boleh Kosong"]})
      })
    })
  }
  else {
  let address ={
    street : req.body.street,
    city   : req.body.city,
    zipcode : req.body.zipcode,
    contactid : req.body.contact_id
  }
  Address.addnew(address)
  res.redirect('/address')
}
})

route.get('/edit/:id',(req,res)=>{
  Address.gettable('Contacts',rowstable =>{
    Address.edit(req.params.id,row=>{
      res.render('addressEdit',{rowAddress:row,contact :rowstable,error:[]})
    })
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      street    : req.body.jalan,
      city    : req.body.kota,
      zipcode : req.body.kodepos,
      contactid : req.body.contactid
    }
    // res.send(update)
    Address.update(id,update)
    res.redirect('/address')
})

route.get('/delete/:id',(req,res)=>{
  Address.addDelete(req.params.id)
  res.redirect('/address')
})


module.exports = route;
