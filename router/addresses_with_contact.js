const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')



// Release 8
// - Buatlah routing baru "/addresses_with_contact" yang isinya menampilkan list dari addresses, kemudian tambahkan name dan company dari Contact yang sesuai dengan cara memanipulasi object di routing sebelum dikirimkan ke view menggunakan callback (untuk melatih "callback" kamu maka untuk kasus ini tidak boleh menggunakan JOIN)
// - Tambahkan link pada halaman Contact untuk memanggil routing yang baru kalian buat di atas

router.get('/addresses_with_contact',(req,res)=>{
  Address.findAll().then((dataAddress)=>{
    Contact.findAll().then((dataContact)=>{
      for(let i = 0; i < dataAddress.length; i++){
        for(let j = 0; j < dataContact.length; j++){
          if(dataAddress[i].name == dataContact[j].name){
            dataAddress[i].company = dataContact[j].company
          }
        }
      }
      console.log(dataAddress)
      res.render('addresses_with_contact',{dataAddress})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
module.exports = router
