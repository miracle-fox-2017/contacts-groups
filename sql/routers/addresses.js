const express = require('express')
const router = express.Router()
let Addresses = require('../models/addresses');
let Contacts = require('../models/contacts');



router.get('/',function(req,res){
  Addresses.leftJoinAddresses((err,rows)=>{
      if(err){
        console.log(err)
      }
      else{
            Contacts.findAll((err,data)=>{
          if(err){
            console.log(err);
          }
          else{
            res.render('addresses', {rows : rows, edit:false, data:data});
            // console.log(data);
            console.log(rows);
        }
      })
    }
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
router.get('/addresses_with_contact', function(req, res){
  // res.send('masuk ga?')
  Addresses.addressesWithContact(params, (err,rows)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('address_with_contact', {rows : rows, params : req.params.id})
      // console.log(rows);
    }
  })

    // Address.findAllAdresses().then(rowAddres) =>{
    //   rowAddress.forEach((data, index)=>{
    //     Contact.Update(data.contact_id)
    //     .then(contactAddress=>{
    //       data[`contact`] = contactAddress;
    //       if(index == rowaddres.length -1){
    //         res render(`addres`, addres : rowAddres)
    //       }
    //     })
    //   })
    // }
    // .catch(err =>{
    // 	res.send(err)
})

router.get('/delete/:id', (req,res) =>{
  let Obj = {id : req.params.id,}
  Addresses.Remove(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/addresses')
  })
})

module.exports = router;
