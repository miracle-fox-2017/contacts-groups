const express = require('express');
const router  = express.Router();

const Contact = require('../models/contact')
const Profile = require('../models/profile')
// const Group   =	require('../models/group')
// const Address =	require('../models/address')

router.get('/', function(req, res){
	let modelArr = [
		Profile.findAllWithContact(),
		Contact.findAll()
	]

	Promise.all(modelArr).then(success =>{
		res.render('profiles',{ edited : undefined, rowProfile : success[0] , contacts : success[1]})
	})
})

router.post('/edit', function(req, res){
	Profile.update(req.body).then(rowContact =>{
		res.redirect('/profiles')
	})
})	

router.post('/', function(req, res){
	Profile.create(req.body)
	.then(success =>{
		res.redirect('/profiles')
	})
	.catch(error =>{
		res.send(error);
	})
})	

router.get('/edit/:id', function(req, res){		
	let modelArr = [
		Contact.findAll(),
		Profile.findAllWithContact(),
		Profile.findById(req.params.id)
	]

	Promise.all(modelArr)
	.then(success =>{
		res.render('profiles',{ edited : success[2] , rowProfile : success[1] , contacts : success[0]})
	})
})

router.get('/delete/:id', function(req, res){		
	Profile.remove(req.params.id)
	.then(()=>{
		res.redirect('/profiles')
	})
	.catch(err =>{
		res.send(err);
	})
})			

module.exports = router