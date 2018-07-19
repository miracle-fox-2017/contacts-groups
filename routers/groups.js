const express = require('express')
const router = express.Router()
const Group = require('../models/groups');
const Contact = require('../models/contacts');
const ContactsGroups = require('../models/Contacts_Groups');

// GROUPS
router.get('/', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama grup sudah ada, coba nama lainya"
  }
  ContactsGroups.findGroups_Contacts()
    .then(rowGroupsContacts=>{
      res.render('groups', {msgError:msgError,rowsGroups:rowGroupsContacts})
    })
      .catch(err=>{
        res.send(err)
      })
})

router.post('/', (req, res)=>{
  Group.create(req.body)
    .then(()=>{
      res.redirect('/groups')
    })
      .catch(()=>{
        res.redirect('/groups/?msgError=true')
      })
})

router.get('/edit/:id', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Nama grup sudah ada, coba nama lainya"
  }
  Group.getById(req.params.id)
    .then(dataGroup=>{
      res.render('editGroups', {msgError:msgError,dataGroups:dataGroup})
    })
      .catch( err=>{
        res.send(err)
      })
})

router.post('/edit/:id', (req, res)=>{
  Group.update(req.params.id, req.body)
    .then(()=>{
      res.redirect('/groups')
    })
      .catch(()=>{
        res.redirect(`/groups/edit/${req.params.id}?msgError=true`)
      })
})

router.get('/delete/:id', (req, res)=>{
  Group.remove(req.params.id)
    .then(()=>{
      res.redirect('/groups')
    })
      .catch(()=>{
        res.send(err)
      })
})

//ASSIG GROUPS

router.get('/assign_contacts/:id_group', (req, res)=>{
  Group.getById(req.params.id_group)
    .then(dataGroup=>{
      return Contact.findAll()
        .then(dataContacts=>{
          res.render('assignContacts', {dataGroup:dataGroup, dataContacts:dataContacts})
        })
    })
      .catch(err =>{
        res.send(err)
      })
})

router.post('/assign_contacts/:id_group', (req, res)=>{
  ContactsGroups.create(req.body.ContactsId, req.params.id_group)
    .then(()=>{
      res.redirect('/groups')
    })
      .catch(err=>{
        res.send(err)
      })
})
module.exports = router;
