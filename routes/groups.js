const express = require('express')
const router = express.Router();

const Group = require('../models/groups');

router.get('/', function(req, res){
  Group.findAll(function(rowsGroups){
    res.render('groups', {rowsGroups})
  })
})

router.post('/', function(req, res){
  Group.addGroup(req.body.name_of_group)
  res.redirect('/groups')
})

router.get('/edit/:id', function(req, res){
  Group.formEditGroup(req.params.id, function(rowsGroups){
    console.log(rowsGroups);
    res.render('editGroups', {rowsGroups})
  })
})

router.post('/edit/:id', function (req, res){
  Group.updateGroup(req.params.id, req.body.name_of_group)
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  Group.deleteGroup(req.params.id)
  res.redirect('/groups')
})

module.exports = router
