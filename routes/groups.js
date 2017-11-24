const express      = require('express')
const router       = express.Router()
const Model        = require('../models/groupsModel')
const Contact      = require('../models/contactsModel')
const ContactGroup = require('../models/contactGroup') 

router.get('/', (req, res)=>{
	ContactGroup.getAllGroupContact().then(result=>{
		res.render('group', {groups : result})
	})
})

router.post('/', (req, res)=>{
	Model.addGroup(req.body.name).then(()=>{
		res.redirect('/groups')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getGroupById(req.params.id).then(result=>{
		res.render('editGroup', {group : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editGroup(req.body).then(()=>{
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteGroup(req.params.id).then(()=>{
		res.redirect('/groups')
	})
})

router.get('/assign_contacts/:id', (req, res)=>{
	Contact.getAllContact().then(contacts=> {
		Model.getGroupById(req.params.id).then(group=> {
			res.render('assignContact', {contacts, group})
		})		
	})
})

router.post('/assign_contacts/:id', (req, res)=>{
	req.body.id_group = req.params.id
	Model.addContactGroup(req.body, ()=>{
		res.redirect('/groups')
	})
})

module.exports = router