const express = require('express')
const router = express.Router()
const Group = require('../models/group')
const Contact = require('../models/contact')
const ContactGroup = require('../models/contact_group')


router.get('/', (req, res)=>{
	Group.read(groups=>{
		ContactGroup.read(contact_group =>{
			Contact.read(contacts =>{

				groups.forEach(group =>{
					group.contacts = []
					contact_group.forEach(cg =>{
						contacts.forEach(contact =>{
							
							if(group.id == cg.id_group && cg.id_contact == contact.id){
								group.contacts.push(contact.name)
								console.log(group)
							}
						})
					})
				})
				console.log(groups)
					
				res.render('groups/list', {groups})			
			})
		})
		
		
	})
})

router.get('/edit/:id', (req, res)=>{

	Group.select_by_id(req.params, (data)=>{
		res.render('groups/edit', {group : data})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		name_of_group	: req.body.name_of_group,
	}

	console.log('ini di router', obj)
	Group.update(obj, (data)=>{
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Group.delete(req.params, data=>{
	})
})

router.get('/assign_contacts/:id', (req, res)=>{
	Group.select_by_id(req.params, hasil=>{
		Contact.read(contact =>{
			console.log(contact)
		res.render('groups/assign_contact', {groups : hasil, contact})
		})
	})
})

router.post('/assign_contacts/:id', (req, res)=>{
	let obj = {
		id_contact : req.body.id_contact,
		id_group : req.params.id
	}
		// console.log(obj)
	ContactGroup.insert(obj, hasil=>{
		res.redirect('/groups')
	})
})

module.exports = router