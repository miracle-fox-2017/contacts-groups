const express = require('express')
const router = express.Router()
const Model = require('../models/contactsModel')
const Group = require('../models/groupsModel')

router.get('/', (req, res)=>{
	// Model.getAllContact(result=>{
	// 	let message = ""
	// 	res.render('contact', {contacts : result, message})
	// })
	let message = ""

	Model.getAllContactGroup(contacts=>{
		Group.getAllGroup(groups=>{
			// res.send({contacts, groups})
			res.render('contact', {contacts, groups, message})
		})
	})
})

router.post('/', (req, res)=>{
	if(!req.body.name){
		Model.getAllContact(result=>{
			let message = "Kolom nama tidak boleh kosong"
			res.render('contact', {contacts : result, message})
		})
	}else{
		Model.addContact(req.body, ()=>{
			res.redirect('/contacts')
		})	
	}
	
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