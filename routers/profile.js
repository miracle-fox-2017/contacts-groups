const express = require('express');
const router  = express.Router();

const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

router.get('/', function(req, res){
	Profile.findAllWithContact(function (err, rowProfile){
		Contact.findAll(function(err, rowContact){
			res.render('profiles',{ edited : undefined, rowProfile : rowProfile , contacts : rowContact})
		})			
	})
})

router.post('/edit', function(req, res){
	Profile.update(req.body, function(err, rowContact){
		res.redirect('/profiles')
	})
		
})	

router.post('/', function(req, res){
	Profile.create(req.body, function(err, rowProfile){
		res.redirect('/profiles')
	})
})	

router.get('/edit/:id', function(req, res){		
	Contact.findAll(function(err,rowContact){
		Profile.findAllWithContact(function(err,rowProfile){
			Profile.findById(req.params.id, function(err, editedProfile){
				res.render('profiles',{ edited : editedProfile, rowProfile : rowProfile , contacts : rowContact})
			})
		})
	})
})

router.get('/delete/:id', function(req, res){		
	Profile.remove(req.params.id, function(err){
		res.redirect('/profiles')	
	})
})			

module.exports = router