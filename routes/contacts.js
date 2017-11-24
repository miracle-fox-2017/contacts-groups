const express = require('express')
const router  = express.Router()
const Model   = require('../models/contactsModel')
const Group   = require('../models/groupsModel')
const Konj	  = require('../models/contactGroup')

router.get('/', (req, res)=>{
	let message = ""

	Konj.getAllContactGroup().then(result=> {
		Group.getAllGroup().then(groups=> {
			res.render('contact', {contacts : result, groups : groups, message})
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
		Model.addContact(req.body).then(()=>{
			res.redirect('/contacts')
		}).catch(err=> {
			console.log(err)
		})	
	}
})

router.get('/edit/:id', (req, res)=>{
	Model.getContactById(req.params.id).then(result=> {
		res.render('editContact', {contact : result})
	}).catch(err =>{
		console.log(err);
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editContact(req.body).then(()=>{
			res.redirect('/contacts')
	}).catch(err=> {
		console.log(err);
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteContact(req.params.id).then(()=>{
		res.redirect('/contacts')
	}).catch(err=> {
		console.log(err);
	})
})

router.get('/addresses_with_contact/:id', (req, res)=> {
	Model.getAddressByIdContact(req.params.id).then(result=>{
		res.send(result)
	})
})

module.exports = router