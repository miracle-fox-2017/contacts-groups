const express = require ('express')
const bodyParser = require('body-parser')
const AddressDB = require('../models/address')
const ContactDB = require('../models/contacts')
let contact = new ContactDB('database.db')
let address = new AddressDB('database.db')
const app = express()





const router = express.Router()

//AddressPage
//get database

router.get('/',(req,res) =>{
    address.findAllWithContact((rowsAdd)=>{
       
      
        contact.getDatabase((rowsContact) => {  //[{}]
            
            // res.send(req.query.error)
            // if(req.query.hasOwnProperty('error')){
            //    msg = 'Nama atau Username tidak boleh kosong'
            // }else if(req.query.hasOwnProperty('contact')){
            //    msg = 'Contact Assigned'
            // }
            // else{
            //     msg = null
            // }
            // res.send(rowsAdd)
            res.render('address', {rows: rowsAdd, contacts: rowsContact})
   })
})

});
// add data
router.post('/',(req,res) =>{
    // res.send(req.body)
    // console.log(req.body)
    address.addData(req);
    res.redirect('/address')
})
// delete data
router.get('/delete/:id',(req,res) =>{
    // res.send('hello')
    address.removeData(req.params.id);
    res.redirect('/address');
})


router.get('/edit/:id',(req,res) =>{
    contact.getDatabase(rowsContact =>{
        address.getDataById((req.params.id),function(err,rowID){
            if(!err){
                res.render('addressedit',{data:rowID,rows:rowsContact})
            }
        })
    })

})

router.post('/edit/:id',(req,res)=>{
    address.editData(req);
    res.redirect('/address');
})


router.get('/contacts/addresses_with_contact/:id',(req,res)=>{
    address.findAddressWithContact(req,(err,rows)=>{
        res.render('addresswithcontact',{data:rows})
    })
})





module.exports = router