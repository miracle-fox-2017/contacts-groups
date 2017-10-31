const express      = require('express')
const router       = express.Router()
const Model        = require('../models/groupsModel')
const Contact      = require('../models/contactsModel')
const ContactGroup = require('../models/contactGroup') 

router.get('/', (req, res)=>{

	// Model.getAllGroupContact(groups=>{
	// 	// res.send(groups)
	// 	res.render('group', {groups})
	// })

	ContactGroup.getAllGroupContact().then(result=>{
		res.send(result)
	})
})

router.post('/', (req, res)=>{
	Model.addGroup(req.body.name, ()=>{
		res.redirect('/groups')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getGroupById(req.params.id, result=>{
		res.render('editGroup', {group : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editGroup(req.body, ()=>{
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteGroup(req.params.id, ()=>{
		res.redirect('/groups')
	})
})

router.get('/assign_contacts/:id', (req, res)=>{
	Contact.getAllContactNonGroup(req.params.id, contacts=>{
		// res.send(contacts)
		Model.getGroupById(req.params.id, group=>{
			// res.send({contacts, group})
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