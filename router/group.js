const express = require('express');
const router = express.Router();

const Group = require('../models/group')

router.get('/groups', function (req, res) {
  Group.findAll(function(rows){
    // console.log(rows);
    res.render('groups', {rows})
  })
})

router.post('/groups', function (req, res) {
  // console.log(req.body);
  Group.create(req.body)
    res.redirect('/groups');
})

router.get('/groups/edit/:id', function (req, res) {
  // console.log(req.params);
  Group.findID(req.params.id, function(rows){
    res.render('groupedit', {rows})
  })
})

router.post('/groups/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Group.update(req.body, req.params.id)
    res.redirect('/groups');
  
})

router.get('/groups/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Group.remove(req.params.id);
  res.redirect('/groups');
})

module.exports = router