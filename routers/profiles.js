const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contact')

router.get('/', (req, res)=>{
	Profile.findAll().then((profiles)=>{
		Contact.findAll().then(contacts =>{
			
			profiles.forEach(profile =>{
				contacts.forEach(contact =>{
					if(profile.id_contact == contact.id){
						profile.contact = contact.name
					}
				})
			})
			res.render('profiles/list', {profiles, contacts})
		})
	})
})

router.get('/add', (req, res)=>{
	Contact.findAll().then(contact=>{
		res.render('profiles/add', {contact, error : is_error = false})
	})
})

router.post('/add', (req, res)=>{
	let obj = {
		username : req.body.username,
		password : req.body.password,
		id_contact : req.body.id_contact
	}

	Profile.create(obj).then(hasil=>{
			res.redirect('/profiles')
		
	}).catch(error =>{
		Contact.findAll().then(contact=>{ 
			res.render('profiles/add', {contact, error})
		})
		
	})
})

router.get('/edit/:id', (req, res)=>{

	Profile.findById(req.params).then(profiles =>{
		Contact.findAll().then(contact=>{
			res.render('profiles/edit', {profiles, contact})
		})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		username	: req.body.username,
		password : req.body.password,
		id_contact : req.body.id_contact
	}

	// console.log('ini di router', obj)
	Profile.update(obj).then(data =>{
		res.redirect('/profiles')
	})
})

router.get('/delete/:id', (req, res)=>{
	Profile.delete(req.params, ()=>{
		res.redirect('/profiles')
	})
})


module.exports = router