const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

router.get('/', (req, res) => {
  Address.getAll((err, addressesData) => {
    if(!err){
      res.render('addresses', {title:'Addresses', addresses:addressesData})
    }else{
      res.send(err)
    }
  })
})

router.get('/add', (req, res) => {
  Contact.getAll((err, contactsData) => {
    res.render('addresses/add', {title:'Add Address', contacts:contactsData})
  })
})

router.post('/add', (req, res) => {
  Address.create(req.body,err => {
    if(!err){
      res.redirect('/addresses')
    }else{
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res) => {
  Address.getOne(req.params.id, (err, address) => {
    if(!err){
      Contact.getAll((err, contactsData) => {
        res.render('addresses/edit', {title:'Edit Address', address:address, contacts:contactsData});
      })
    }else{
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res) => {
  Address.update(req.body, req.params.id, err => {
    if(!err){
      res.redirect('/addresses')
    }else{
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Address.destroy(req.params.id, err => {
    if(!err){
      res.redirect('/addresses')
    }else{
      res.send(err)
    }
  })
})

module.exports = router;
