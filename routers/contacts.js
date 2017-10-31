const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')
const Group = require('../models/group')
const ContactGroup = require('../models/contact_group')


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
	Group.findAll().then(group=>{
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


	Contact.create(obj_contact).then(id =>{
		let obj_conj = {
			id_contact : id.lastID,
			id_group : req.body.id_group
		}

		ContactGroup.create(obj_conj)( tes=>{
			res.redirect('/contacts')
		})
	})
})



router.get('/edit/:id', (req, res)=>{

	Contact.findById(req.params.id).then(contact =>{
		res.render('contacts/edit', {contact})
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

	Contact.update(obj).then(data =>{
		res.redirect('/contacts')
	})
})

router.get('/delete/:id', (req, res)=>{
	Contact.delete(req.params, data=>{
		res.redirect('/contacts')
	})
})


module.exports = router