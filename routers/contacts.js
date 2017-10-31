const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
const Group = require('../models/group')
const ContactGroup = require('../models/contact_group')


// router.get('/', (req, res)=>{
// 	Contact.read(contacts=>{
// 		ContactGroup.read(contact_group=>{
// 			Group.read(groups =>{
				
// 				contacts.forEach(contact =>{
// 					contact.groups = []
// 					contact_group.forEach(cg =>{
// 						groups.forEach(group =>{
// 							if(contact.id == cg.id_contact && group.id == cg.id_group){	
// 								contact.groups.push(group.name_of_group)
// 							}
// 						})
// 					})
// 				})
// 				console.log(contacts)
// 				res.render('contacts/list', {contacts})
// 			})
// 		})
// 	})
// })

router.get('/', (req, res)=>{
	Promise.all([
		Contact.findAll(),
		ContactGroup.findAll(),
		Group.findAll()
		]).then(object => {

				object[0].forEach(contact =>{
					contact.groups = []
					object[1].forEach(contact_group =>{
						object[2].forEach(group =>{
							if(contact.id == contact_group.id_contact && group.id == contact_group.id_group){
								contact.groups.push(group.name_of_group)
							}
						})
					})
				})
				res.render('contacts/list', {contacts : object[0]})
			})
	
})

router.get('/add', (req, res)=>{
	Group.read(group=>{
		console.log(group)
		res.render('contacts/add', {group})
	})
})

router.post('/add', (req, res)=>{
	// res.send(req.body)
	let obj_contact = {
		name : req.body.name,
		company : req.body.company,
		telp_number : req.body.telp_number,
		email : req.body.email,
	}


	Contact.insert(obj_contact, (id)=>{
		let obj_conj = {
			id_contact : id.lastID,
			id_group : req.body.id_group
		}

		ContactGroup.insert(obj_conj, ()=>{
			res.redirect('/contacts')
		})
	})
})



router.get('/edit/:id', (req, res)=>{

	Contact.select_by_id(req.params.id, (data)=>{
		res.render('contacts/edit', {contact : data})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id			: req.params.id,
		name		: req.body.name,
		company 	: req.body.company,
		telp_number : req.body.telp_number,
		email		: req.body.email 
	}

	Contact.update(obj, (data)=>{
		res.redirect('/contacts')
	})
})

router.get('/delete/:id', (req, res)=>{
	Contact.delete(req.params, data=>{
		res.redirect('/contacts')
	})
})


module.exports = router