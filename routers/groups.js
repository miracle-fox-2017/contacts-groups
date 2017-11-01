const express = require('express')
const router = express.Router();
const Group = require('../models/groups');
const Contact = require('../models/contact');


router.get('/', (req, res)=>{
  Group.groupContact(req, (err, dataGroup)=>{
    if (!err) {
      let data = {
        rows : dataGroup
      }
      res.render('groups', data)
    }else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  Group.create(req, (err, dataGroup)=>{
    // console.log(dataGroup);
    if (!err) {
      res.redirect('/groups')
    }else {
      res.send(err)
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  Group.findById(req, (err, dataGroup)=>{
    if (!err) {
      let data = {
        rows : dataGroup
      }
      res.render('groups-edit', data)
    }else {
      res.send(err)
    }
  })
})



router.post('/edit/:id', (req, res)=>{
  Group.update(req, (err, dataGroup)=>{
    if (!err) {

      res.redirect('/groups')
    }else {
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Group.remove(req, (err, dataGroup)=>{
    console.log(dataGroup);
    if (!err) {
      res.redirect('/groups')
    }else {
      res.send(err)
    }
  })
})

router.get('/contacts/:id', (req, res)=>{
  Group.findById(req, (err, dataUpdate)=>{
    if (!err) {
      Contact.findAll((err, dataContact)=>{
        let groupUpdate = {
          rows : dataUpdate,
          data : dataContact
        }
        res.render('groups-contacts', groupUpdate);
      })
    }else {
      res.send(err)
    }
  })
} )

router.post('/contacts/:id', (req, res)=>{
  Group.inputconj(req, (err, dataConjunction)=>{
    if (!err) {
      res.redirect('/groups')
    }else {
      res.send(err)
    }
  })
})






module.exports = router;
