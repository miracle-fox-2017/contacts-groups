const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Profile = require('../models/profiles')

//release 3
// 1. Tabel Contacts dan Table Profiles memiliki relasi dimana satu data contact hanya boleh memiliki satu data profile. 
// Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)

//release 4
// 1. Pada route get '/profiles', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
// 2. Pada saat melakukan add di halaman profiles, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data profile tersebut
// 3. Pada saat melakukan edit di halaman profiles, data profile harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya
//menampilkan profile

router.get('/profiles',function(req,res){
  let isEdit = false
  Profile.findAll().then((dataProfile)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('profiles',{dataProfile,dataContact,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})

//menambahkan profile 
router.post('/profiles',function(req,res){
  let obj = {username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.create(obj).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
})

//delete profile
router.get('/profiles/delete/:id',function(req,res){
  let id = req.params.id
  Profile.remove(id).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
 })

//edit profile get
router.get('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Profile.findById(id).then((dataProfile)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('profiles',{dataProfile,dataContact,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})

//edit profile post
router.post('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.update(obj).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
