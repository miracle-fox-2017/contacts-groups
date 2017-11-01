const express = require ('express')
const bodyParser = require('body-parser')
const ProfileDB = require('../models/profile')
const ContactDB = require('../models/contacts')
let contact = new ContactDB('database.db')
let profile = new ProfileDB('database.db')
const app = express()





const router = express.Router()

//ProfilePage
//get database
// router.get('/',(req,res) =>{
//     profile.getDatabase((rows)=>{
//         profile.findAll((rowsID) =>{
//             console.log('hello')
//             let newObj = {
//                 contactData:rowsID,
//                 rows:rows
//             }
//             res.render('profile',newObj)
//    })
// })

// });



router.get('/',(req,res) =>{
    profile.findAllWithContact((rowsProfile)=>{
       
      
        contact.getDatabase((rowsContact) => {  //[{}]
            
            // res.send(req.query.error)
            if(req.query.hasOwnProperty('error')){
               msg = 'Nama atau Username tidak boleh kosong'
            }else if(req.query.hasOwnProperty('contact')){
               msg = 'Contact Assigned'
            }
            else{
                msg = null
            }
            res.render('profile', {rows: rowsProfile, contacts: rowsContact,msgObj: msg})
   })
})

});

//addData

router.post('/',(req,res) =>{
    // console.log(req.body)
    // profile.addData(req.body)
    if(profile.addData(req.body) == null){

        res.redirect('/profile?error=true')
    }
    else if(profile.addData(req.body) == err){
       res.redirect('/profile?contact=assigned')
        
    }
    else{
        res.redirect('/profile')
    }
    
})

//deleteData

router.get('/delete/:id',(req,res)=>{
    profile.removeData(req.params.id);
    res.redirect('/profile');
})

//editData

router.get('/edit/:id',(req,res) =>{
    profile.getDatabyId((req.params.id),function(err,rowID){
        if(!err){
            res.render('profileedit',{data:rowID})
        }
    })
})

//post data edited

router.post('/edit/:id',(req,res) =>{
    profile.editData(req);
    res.redirect('/profile');
})





module.exports = router