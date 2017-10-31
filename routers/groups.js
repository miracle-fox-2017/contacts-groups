const express = require('express')
const router = express.Router()
const Group = require('../models/group')
const Contact = require('../models/contact')
const ContactGroup = require('../models/contact_group')


// router.get('/', (req, res)=>{
// 	Group.read(groups=>{
// 		ContactGroup.read(contact_group =>{
// 			Contact.read(contacts =>{

// 				groups.forEach(group =>{
// 					group.contacts = []
// 					contact_group.forEach(cg =>{
// 						contacts.forEach(contact =>{
							
// 							if(group.id == cg.id_group && cg.id_contact == contact.id){
// 								group.contacts.push(contact.name)
// 								console.log(group)
// 							}
// 						})
// 					})
// 				})
// 				console.log(groups)

// 				res.render('groups/list', {groups})			
// 			})
// 		})
		
		
// 	})
// })
router.get('/', (req, res)=> {
	Promise.all([
		Group.findAll(),
		ContactGroup.findAll(),
		Contact.findAll()
		
		]).then(object =>{

				object[0].forEach(group => {
					group.contacts = []
					object[1].forEach(cg => {
						object[2].forEach(contact => {
							if(contact.id == cg.id_contact && group.id == cg.id_group){
								group.contacts.push(contact.name)
							}
						})
					})
				})
				res.render('groups/list', {groups : object[0]})
			})
})

router.get('/edit/:id', (req, res)=>{

	Group.findById(req.params).then(data => { 
		res.render('groups/edit', {group : data})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		name_of_group	: req.body.name_of_group,
	}

	Group.update(obj).then(data => {
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Group.remove(req.params).then(data => {
		res.redirect('/groups')
	})
})

router.get('/assign_contacts/:id', (req, res)=>{
	Group.findById(req.params).then(hasil=>{
		Contact.findAll().then(contact =>{
		res.render('groups/assign_contact', {groups : hasil, contact})
		})
	})
})

router.post('/assign_contacts/:id', (req, res)=>{
	let obj = {
		id_contact : req.body.id_contact,
		id_group : req.params.id
	}
	
	ContactGroup.create(obj).then(hasil=>{
		res.redirect('/groups')
	})
})

module.exports = router