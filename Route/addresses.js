const express = require('express')
const bodyParser = require('body-parser')
const Address = require('../Model/address');

var route = express.Router()

route.get('/',(req,res)=>{
  Address.getall(rows=>{
    res.render('addresses',{address : rows})
  })
})

route.post('/',(req,res)=>{
  let address ={
    street : req.body.street,
    city   : req.body.city,
    zipcode: req.body.zipcode
  }
  Address.addnew(address)
  res.redirect('/address')
})

route.get('/edit/:id',(req,res)=>{
  Address.edit(req.params.id,row=>{
    res.render('addressEdit',{rowAddress:row})
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      street    : req.body.jalan,
      city    : req.body.kota,
      zipcode : req.body.kodepos
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
