const express = require('express')
const router = express.Router()
let Addresses = require('../models/addresses');

router.get('/',function(req,res){
  Addresses.findAllAdresses((err,rows)=>{
    if(err){console.log(err)}
    res.render('addresses',{rows:rows, edit:false})
  })
})
router.post('/',(req,res) =>{
  // res.send('masuk ga?')
  let Obj = {
  street : req.body.street,
  city : req.body.city,
  zipcode : req.body.zipcode,
  }
  Addresses.addressesCreate(Obj, (err, rows)=>{
    if(err){console.log(err)}
    res.redirect('/addresses')
  })
})
router.get('/edit/:id',(req,res)=>{
  let edit = true;
  let Obj = {id : req.params.id,}
  Addresses.addressesUpdate(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.render('addresses', {rows:rows, edit:true})
  })
})

router.post('/edit/:id',(req,res)=>{
  let Obj = {
  id : req.params.id,
  street : req.body.street,
  city : req.body.city,
  zipcode : req.body.zipcode,
  }
  Addresses.addressesUpdatePost(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/addresses')
  })
})
router.get('/delete/:id', (req,res) =>{
  let Obj = {id : req.params.id,}
  Addresses.Remove(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/addresses')
  })
})

module.exports = router;
