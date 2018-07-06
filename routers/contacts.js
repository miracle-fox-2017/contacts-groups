const express  = require('express')
const router   = express.Router()
const groups   = require('../models/groups')
const contacts = require('../models/contacts')
const contacts_groups = require('../models/contacts_groups')

// CREATE
router.post('/', function(req,res){
  contacts.create(req.body).then(()=>{
    res.redirect('contacts')
  }).catch((err)=>{
    console.log(err,'insert into Contacts');
  })

})

// READ
router.get('/',function(req,res){
  contacts.findAll().then(data_Contacts=>{
      contacts_groups.findAll(data_Contacts).then(data_contacts_groups=>{
            // console.log(data_contacts_groups);
            if(data_contacts_groups){
              groups.findAll().then((data_Groups)=>{
                res.render('contacts',{data_contacts_groups:data_contacts_groups, data_Contacts:data_Contacts,data_Groups:data_Groups})
              }).catch((err)=>{
                console.log(err,'findAll from Groups in Contacts');
              })
            }
      })
    }).catch(err=>{
        console.log(err);
    })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  contacts.findById(req.params).then((data_Contacts)=>{
    res.render('contacts-edit',{data_Contacts:data_Contacts})
  }).catch((err)=>{
    console.log(err,'findById from Contacts');
  })
})

router.post('/edit/:id', function(req,res){
  contacts.update(req.body, req.params).then(()=>{
    res.redirect('../../contacts')
  }).catch((err)=>{
    console.log(err,'update from Contacts');
  })

})

// DELETE
router.get('/delete/:id', function(req,res){
  contacts.reMove(req.params).then(()=>{
    res.redirect('../../contacts')
  }).catch((err)=>{
    console.log(err,'delete from Contacts');
  })

})

module.exports = router
