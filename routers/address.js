const express = require('express');
const router = express.Router();
const Address = require('../models/address');

router.get('/', (req, res)=>{
  Address.findAll((err, dataAddress, dataContact)=>{
    if (!err) {
      let dataAdd = {
        rows: dataAddress,
        data: dataContact
      }
      res.render('address', dataAdd)
    }else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  Address.create(req, (err, dataAddress)=>{
    if (!err) {
      let dataAdd = {
        rows:dataAddress
      }
      res.redirect('/address')
    }else {
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  Address.findById(req, (err, dataAddress, dataContact)=>{
    if (!err) {
      let dataAdd = {
        rows : dataAddress,
        data : dataContact
      }
      res.render('address-edit', dataAdd)
    }else {
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  Address.update(req, (err, dataAddress)=>{
    if (!err) {
      res.redirect('/address')
    }else {
      res.send(err);
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Address.remove(req, (err, dataAddress)=>{
    if (!err) {
      res.redirect('/address')
    }else {
      res.send(err)
    }
  })
})


module.exports = router;
