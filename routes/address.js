const express=require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')
const model=require('../models/address')


router.get('/',(req,res)=>{
  db.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON
    Addresses.idContacts=Contacts.id`,(err,dataAddress)=>{
    db.all("SELECT * FROM Contacts",(err,rowContact)=>{
      res.render('address',{dataAddress:dataAddress,dataContacts:rowContact})
    })
  })
})

router.post('/',(req,res)=>{
  // ,(req.body)=>{
  model.postInsert(req.body)
    res.redirect('/address')
  })
// })

router.get('/delete/:id/',(req,res)=>{
  model.getDelete(req.params)
    res.redirect('/address')
  })

//==========edit Contact=============
router.get('/edit/:id',(req,res)=>{
  // ,(err,dataAddress)=>{
  model.getEditAddress(req.params.id,(dataAddress))
    res.render('addressedit',{dataAddress:dataAddress})
  })

router.post('/edit/:id',(req,res)=>{
  model.postEdit(req.body,req.params,(err)=>{
    if(err){
      res.send(err)
    }
    res.redirect('/address')
  })
})
module.exports = router;
