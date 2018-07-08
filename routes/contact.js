const express=require('express')
const router=express.Router()
const model=require('../models/contact')


router.get('/',(req,res)=>{
  model.findAll()
  .then(contact=>{
    res.render('contact',{data:contact})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/',(req,res)=>{
  model.insertContact(req)
  .then(contacs=>{
    res.redirect('/contact')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id/',(req,res)=>{
  model.deleteContact(req.params)
    res.redirect('/contact')
  })

router.get('/edit/:id'),(req,res)=>{
  model.GetInsertContact()
  .then(contact=>{
    res.render('contactedit',{data:contact})
  })
}

module.exports = router;

// router.post('/edit/:id',(req,res)=>{
//   model.postInsertContact(req.body,req.params.id,(err)=>{
//     if (err) {
//       res.send(err)
//     }
//     res.redirect('/contact')
//   })
// })



// router.get('/edit/:id',(req,res)=>{
//   model.getInsertContact(req.params.id,(row)=>{
//     res.render('contactedit',{data:row})
//   })
// })

// router.get('/',(req,res)=>{
//   model.findAll((row)=>{
//     row.forEach(data =>{
//     })
//     res.render('contact',{data:row})
//   })
// })


// router.post('/',(req,res)=>{
//   model.insertContact(req.body)
//     res.redirect('/contact')
// })



// router.get('/edit/:id',(req,res)=>{
//   model.getInsertContact(req.params.id,(row)=>{
//     res.render('contactedit',{data:row})
//   })
// })
//
// router.post('/edit/:id',(req,res)=>{
//   model.postInsertContact(req.body,req.params.id,(err)=>{
//     if (err) {
//       res.send(err)
//     }
//     res.redirect('/contact')
//   })
// })





// sidoel.cekLulus(true).then(success => {
//   console.log(success);
//   return sidoel.bulanmadu(true)
// } ).then(success => {
//   return sidoel.bangunrumah(false)
// }).catch(
//   error => {
//     console.log(error);
//   }
// );



// var sqlite3= require ('sqlite3');
// var db=new sqlite3.Database('./db/database.db')
//
//
// router.get('/',(req,res)=>{
//   db.all(`SELECT * FROM Contacts LEFT JOIN Addresses ON
//     Contacts.idContacts=Addresses.id`,(err,Contacts)=>{
//     db.all("SELECT * FROM Addresses",(err,rowAddresses)=>{
//       res.render('contact',{dataContacts:dataContacts,dataAddress:rowAddresses})
//     })
//   })
// })

// router.post('/',(req,res)=>{
  // ,(req.body)=>{
  // model.postInsert(req.body)
  //   res.redirect('/contact')
  // })
// })
