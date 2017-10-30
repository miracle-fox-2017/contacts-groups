const express = require('express')
const router = express.Router()
let Contact = require('../models/contacts');

router.get('/',function(req,res){
  Contact.findAll((err,rows)=>{
    if(err){console.log(err)}
    res.render('contacts', {rows:rows, edit: false})
    console.log('masuk di contacts');
  })
})
router.post('/', function(req,res){
  let Obj = {
    name : req.body.name,
    company : req.body.company,
    phoneNumber : req.body.phoneNumber,
    email : req.body.email,
  }
  Contact.Create(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/contacts')
  })
})
router.get('/edit/:id',function(req,res){
  //console.log(req.params.id)
  let request = {params: req.params.id};
  let edit = true;

  Contact.Update(request, (err, rows)=>{
    if(err){console.log(err)}
    console.log(rows);
    res.render('contacts', {rows:rows, edit:true})
  })
})

router.post('/edit/:id', function(req,res){
  let Obj = {
    id : req.params.id,
    name : req.body.name,
    company : req.body.company,
    phoneNumber : req.body.phoneNumber,
    email : req.body.email,
  }
  Contact.EditPost(Obj,(err,rows)=>{
    if(!err){console.log(err)}
    res.redirect('/contacts')
  })
})

router.get('/delete/:id', function(req,res){
  let Obj = {id : req.params.id,}

  Contact.Remove(Obj, (err, rows)=> {
    if(err){console.log(err)}
    res.redirect('/contacts')
  })
})

module.exports = router;
