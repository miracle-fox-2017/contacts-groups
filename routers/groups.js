const express = require('express')
const router = express.Router()
const Group = require('../models/groups.js')

router.get('/groups', function(req, res){
  Group.findAll(dataGroups=>{
    res.render('groups/groups',{dataGroups:dataGroups});
  })
})

router.post('/groups', function(req, res){
  Group.create(req, dataGroups=>{
    res.redirect('/groups')
  })
})

router.get('/groups/edit/:id', (req, res)=>{
  Group.findById(req, dataGroups =>{
    res.render('groups/edit', {dataGroups:dataGroups})
  })
})

router.post('/groups/edit/:id', (req, res)=>{
  Group.update(req, dataGroups =>{
    res.redirect('/groups')
  })
})


router.get('/groups/delete/:id', (req, res)=>{
  Group.destroy(req, dataGroups =>{
    res.redirect('/groups')
  })
})



module.exports = router;
