const express =require('express')
const router=express.Router()
var sqlite3= require ('sqlite3');
var db = new sqlite3.Database('./db/database.db')


const model=require('../models/address')



router.get('/',(req,res)=>{
  db.all(`SELECT * FROM Addresses LEFT JOIN Contacts ON
    Addresses.idContacts=Contacts.id`,(err,dataAddress)=>{
    db.all("SELECT * FROM Contacts",(err,rowContact)=>{
      res.render('addressview',{dataAddress:dataAddress,dataContacts:rowContact})
    })
  })
})

router.post('/',(req,res)=>{
  // ,(req.body)=>{
  model.postInsert(req.body)
    res.redirect('/addressview')
  })


module.exports = router;
