const express  = require('express')
const router   = express.Router()
const groups   = require('../models/groups')


// CREATE
router.post('/', function(req,res){
  groups.create(req.body)
  res.redirect('groups')
})

// READ
router.get('/',function(req,res){
  groups.findAll(function(err,data_Groups){
    res.render('groups',{data_Groups:data_Groups})
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  groups.findById(req.params, function(err,data_Groups){
    if(!err){
      res.render('groups-edit',{data_Groups:data_Groups})
    }else{
      console.log(err);
    }
  })
})

router.post('/edit/:id', function(req,res){
  groups.update(req.body,req.params)
  res.redirect('../../groups')
})

// DELETE
router.get('/delete/:id', function(req,res){
  groups.reMove(req.params)
  res.redirect('../../groups')
})


module.exports = router
