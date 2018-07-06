const express  = require('express')
const router   = express.Router()
const groups   = require('../models/groups')
const contacts = require('../models/contacts')
const contacts_groups = require('../models/contacts_groups')


// CREATE
router.post('/', function(req,res){
  groups.create(req.body).then(()=>{
    res.redirect('groups')
  }).catch((err)=>{
    console.log(err,'create from groups');
  })

})

// READ
router.get('/',function(req,res){
  groups.findAll().then((data_Groups)=>{
    res.render('groups',{data_Groups:data_Groups})
  }).catch((err)=>{
    console.log(err,'findAll from groups');
  })
})

// UPDATE
router.get('/edit/:id_group', function(req,res){
  groups.findById(req.params.id_group).then((data_Groups)=>{
    res.render('groups-edit',{data_Groups:data_Groups})
  }).catch((err)=>{
    console.log(err,'findById from Groups');
  })
})

router.post('/edit/:id', function(req,res){
  groups.update(req.body,req.params).then(()=>{
    res.redirect('../../groups')
  }).catch((err)=>{
    console.log(err,'update from Groups');
  })

})

// DELETE
router.get('/delete/:id', function(req,res){
  groups.reMove(req.params).then(()=>{
    res.redirect('../../groups')
  }).catch((err)=>{
    console.log(err,'delete from Groups');
  })

})

// ASSIGN GROUPS
router.get('/assign_contacts/:id_group', function(req,res){
  groups.findById(req.params.id_group).then((data_Groups)=>{
    // console.log(data_Groups);
    contacts.findAll().then((data_Contacts)=>{
      res.render('groups-assign-contact',{data_Contacts:data_Contacts,data_Groups:data_Groups})
    }).catch((err)=>{
      console.log(err,'contact findAll');
    })
  }).catch((err)=>{
    console.log(err,'groups findall');
  })
})

router.post('/assign_contacts/:id', function(req,res){
  // console.log(req.params.id);
  // console.log('>>>', req.body.name);
  contacts_groups.create(req.params,req.body).then(()=>{
    res.redirect('../../groups')
  }).catch((err)=>{
    console.log(err);
  })
})


module.exports = router
