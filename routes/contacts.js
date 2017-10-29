const express = require('express')
const router = express.Router()
const Model = require('../models/contactsModel')

router.get('/', (req, res)=>{
	Model.getAllContact(result=>{
		res.render('contact', {contacts : result})
	})
})

router.post('/', (req, res)=>{
	Model.addContact(req.body, ()=>{
		res.redirect('/contacts')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getContactById(req.params.id, result=>{
		res.render('editContact', {contact : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editContact(req.body, err=>{
		if(!err){
			res.redirect('/contacts')	
		}else{
			console.log(err);
		}
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteContact(req.params.id, ()=>{
		res.redirect('/contacts')
	})
})

module.exports = router