const express = require('express')
const router = express.Router();
const Contact = require('../models/contact');
const Address = require('../models/address');
const Group = require('../models/groups');

// SELECT
router.get('/', (req, res)=> {
  Contact.findAll((err, dataContact)=>{
    if (!err) {
      Group.findAll((err, dataGroup)=>{
        let dataC ={
          message: null,
          rows : dataContact,
          data : dataGroup
        }
        res.render('contacts',dataC);
      })
    }else {
      res.send(err);
    }
  })

});

// INSERT
router.post('/', function (req, res) {
  // console.log(req.body.name);
  if (req.body.name == '') {
    Contact.findAll((err, dataContact)=>{
      if (!err) {
        Group.findAll((err, dataGroup)=>{
          let dataC ={
            message: "Nama Tidak Boleh Kosong",
            rows : dataContact,
            data : dataGroup
          }
          res.render('contacts',dataC);
        })
      }else {
        res.send(err);
      }
    })
  }else{
    Contact.create(req, (err, rows, data) =>{
      if(!err){
        res.redirect('/contacts')
      }else {
        res.send(err)
      }
    })
  }
})

// UPDATE
router.get('/edit/:id', function(req, res) {

  Contact.findById(req, (err, dataUpdate)=>{
    if (!err) {
      let contactUpdate = {
        rows : dataUpdate
      }
      res.render('contacts-edit', contactUpdate);
    }else {
      res.send(err)
    }
  })
})

router.post('/:id', function(req, res) {
  Contact.update(req, (err, dataUpdate)=>{
    if(!err){
      res.redirect('/contacts')
    }else {
      res.send(err)
    }
  })
})

// DELETE
router.get('/delete/:id', function(req, res) {
  Contact.remove(req, (err, dataContact)=>{
    if (!err) {
      res.redirect('/contacts')
    }else{
      res.send(err);
    }
  })
})

router.get('/address/:id', function(req, res) {
  Contact.findById(req, (err, dataUpdate)=>{
    if (!err) {
      Address.findByIdContact(req,(err, dataAddress)=>{
        if (!err) {
          let contactAddress = {
            rows : dataUpdate,
            data : dataAddress
          }
          res.render('contacts-address', contactAddress)
        }
      })
    }else {
      res.send(err)
    }
  })
})


module.exports = router;
