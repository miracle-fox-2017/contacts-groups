const express = require('express')
const router = express.Router()
let Profile = require('../models/profile');

router.get('/',function(req,res){
Profile.leftJoin((err,rows)=>{
  console.log(rows);
    if(err){console.log(err)}
    else{
          res.render('profile', {rows : rows, isEdit:false});
        }
  })
})
// //PROFILE ADD
router.post('/', function(req,res){
  let Obj={
  username : req.body.username,
  password : req.body.password,
  }
  Profile.profileCreate(Obj, (err, rows)=> {
    if(err){console.log(err)}
    res.redirect('/profile')
  })
})
router.get('/edit/:id',function(req,res){
  let isEdit = true;
  let Obj = {id : req.params.id,}
  Profile.profileUpdate(Obj, (err, rows)=>{
    if(err){console.log(err)}
    res.render('profile', {rows:rows, isEdit:true})
  })
})
router.post('/edit/:id', function(req,res){

  let Obj = {
  id : req.params.id,
  username : req.body.username,
  password : req.body.password,
  }
  Profile.profileUpdatePost(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/profile')
  })
})

router.get('/delete/:id', function(req,res){
  let Obj = {id : req.params.id,}
  Profile.remove(Obj, (err,rows)=>{
  if(err){console.log(err)}
  res.redirect('/profile')
  })
})

module.exports = router;
