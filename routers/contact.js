const express = require('express');
const router  = express.Router();


const Contact = require('../models/contact')
// const Profile = require('../models/profile')
// const Group   =	require('../models/group')
// const Address =	require('../models/address')

	router.get('/', function(req, res){	
		Contact.findAll()
		.then(rowContact =>{
			res.render('contacts', {edited : undefined, rowContact : rowContact})
		})
		.catch(err => {
			res.send(err)
		})
	})

	router.post('/edit', function(req, res){
		Contact.update(req.body)
		.then(rowContact =>{
			res.redirect(`/contacts`)
		})
		.catch(err =>{
			res.send(err)
		})
	})	

	router.post('/', function(req, res){
		Contact.create(req.body)
		.then(rowContact =>{
			res.redirect('/contacts');
		})
		.catch(err =>{
			res.send(err)
		})		
	})	

	router.get('/edit/:id', function(req, res){	
		let modelArr = [
			Contact.findAll(),
			Contact.findById(req.params.id)
		]
			Promise.all(modelArr)
			.then(success =>{
				res.render('contacts', {edited: success[1] , rowContact : success[0]})
			})
			.catch(err =>{
				res.send(err);
			})	
			.catch(error =>{
			res.send(error);
			})
	})

	router.get('/delete/:id', function(req, res){	
		Contact.remove(req.params.id).then(()=> {
			res.redirect('/contacts')
		})
		.catch(err => {
			res.send(err)
		})
	})	


module.exports = router