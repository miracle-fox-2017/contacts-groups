const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Contact = require('../models/contact')

router.get('/', (req, res)=>{
	Profile.read(profile=>{
		Contact.read(contact =>{
			res.render('profiles/list', {profiles : profile, contacts : contact})
		})
	})
})

router.get('/add', (req, res)=>{
	Contact.read(data=>{
		res.render('profiles/add', {contact : data, error : is_error = false})
	})
})

router.post('/add', (req, res)=>{
	let obj = {
		username : req.body.username,
		password : req.body.password,
		id_contact : req.body.id_contact
	}
	console.log(obj)

	Profile.insert(obj, err=>{
		
		if(err.is_error){
			console.log(err)
			Contact.read(data=>{
				res.render('profiles/add', {contact : data, error : err})
			})
		}
		else{
			res.redirect('/profiles')
		}
		
	})
})

router.get('/edit/:id', (req, res)=>{

	Profile.select_by_id(req.params, (profile)=>{
		Contact.read(contact=>{
			res.render('profiles/edit', {profiles : profile, contact})
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
	Profile.update(obj, (data)=>{
		res.redirect('/profiles')
	})
})

router.get('/delete/:id', (req, res)=>{
	Profile.delete(req.params, ()=>{
		res.redirect('/profiles')
	})
})


module.exports = router