const express = require('express')
const router = express.Router()
let Profile = require('../models/profile');
let Contacts = require('../models/contacts');

router.get('/',function(req,res){
Profile.leftJoin((err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
          Contacts.findAll((err,data)=>{
            if(err){
            }
            else{
              res.render('profile', {rows : rows, isEdit:false, data:data});
              // console.log(data);
        }
      })
    }
  })
})

/*- Tambahkan validasi pada halaman Profile, saat melakukan add profile dan memilih contact yang sudah memiliki profile munculkan pesan error "Your contact already have profile" pada frontend (ejs)*/

router.post('/', function(req,res){
  // res.send('masuk ga?')
  let Obj={
  id_contact : req.body.id_contact,
  username : req.body.username,
  password : req.body.password,
  }
    console.log(Obj);
        Profile.profileCreate(Obj, (err)=> {
        if(err){
          // res.redirect('/profiles')
          // jika err.code === SQLITE_CONSTRAINT
          // ntah munculin error / redirect
          res.send('sory nih id ga bisa dua nih')
          // console.log(errc.code);
        }
        else{
          // Profile.profileCreate(Obj, (err, rows)=> {
          //console.log(err);
          res.redirect('/profiles')
        //})
        }
  })
})
router.get('/edit/:id',function(req,res){
  // res.send('masuk ga?')
  let isEdit = true;
  let Obj = {id : req.params.id,}
  Profile.profileUpdate(Obj, (err, rows)=>{
    console.log(Obj);
    if(err){console.log(err)}
    else{
      Contacts.findAll((err,data)=>{
        if(err){
          console.log(err);
        }
        else {
          res.render('profile', {rows: rows, data : data, isEdit : true})
        }
      })
    }
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
  // res.send('masuk ga?')
  let Obj = {id : req.params.id,}
  Profile.remove(Obj, (err,rows)=>{
  if(err){console.log(err)}
  res.redirect('/profiles')
  })
})

module.exports = router;
