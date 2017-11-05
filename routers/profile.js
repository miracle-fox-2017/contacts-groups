let express = require('express');
let router = express.Router();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Profile = require('../models/profileMod')
let Contacts = require('../models/contactsMod')

router.get('/',function(req,res){
	Promise.all([Profile.getProfile(),Contacts.getContacts()]).then(function(rows){
		res.render('profiles',{dataJsonProfiles:rows[0],dataJsonContacts:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/', function (req, res) {
	Profile.getPost(req).then(function(rows){
		res.redirect('/profile')
	}).catch(function(err){
		console.log(err);
	});
})

router.get('/edit/:id',function(req,res){
	Promise.all([Profile.getEdit(req),Contacts.getContacts()]).then(function(rows){
		res.render('editProfile',{dataJsonProfiles:rows[0][0],dataJsonContacts:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/edit/:id',function(req,res){
	Profile.updateProfile(req).then(function(){
		res.redirect('/profile')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/delete/:id',function(req,res){
	Profile.deleteProfile(req).then(function(){
		res.redirect('/profile')
	}).catch(function(err){
		console.log(err);
	});
})

module.exports = router
