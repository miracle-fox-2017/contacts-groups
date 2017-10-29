const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

router.get('/', (req, res)=>{
	Contact.read(data=>{
		res.render('contacts/list', {contact : data})
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
		console.log(data)
	})
})


module.exports = router