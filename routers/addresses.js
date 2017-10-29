const express = require('express')
const router = express.Router()
const Addresses = require('../models/address')
const Contact = require('../models/contact')

router.get('/', (req, res)=>{
	Addresses.read(address=>{
		Contact.read(contacts=>{
			res.render('addresses/list', {addresses : address, contacts})
		})
	})
})

router.get('/add', (req, res)=>{
	Contact.read(contact=>{
		res.render('addresses/add', {contact, error : is_error = false})
	})
})

router.post('/add', (req, res)=>{
	let obj = {
		street : req.body.street,
		city : req.body.city,
		zipcode : req.body.zipcode,
		id_contact : req.body.id_contact
	}

	Addresses.insert(obj, ()=>{
		res.redirect('/addresses')		
	})
})


router.get('/edit/:id', (req, res)=>{

	Addresses.select_by_id(req.params, (address)=>{
		Contact.read(contact =>{
			res.render('addresses/edit', {addresses : address, contact})
		})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		street	: req.body.street,
		city : req.body.city,
		zipcode : req.body.zipcode,
		id_contact : req.body.id_contact
	}

	console.log('ini di router', obj)
	Addresses.update(obj, (data)=>{
		res.redirect('/addresses')
	})
})

router.get('/delete/:id', (req, res)=>{
	Addresses.delete(req.params, data=>{
		res.redirect('/addresses')
	})
})


module.exports = router