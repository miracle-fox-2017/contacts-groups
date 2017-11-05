const express = require('express')
const router = express.Router()
const Model = require('../models/profilesModel')
const Contact = require('../models/contactsModel')

router.get('/', (req, res)=>{
	let message = ""
	Model.getAllProfileContact().then(result=>{
		// res.send(result)
		res.render('profile', {profiles : result.profileContact, contacts : result.allcontact, message})
	})
})

router.post('/', (req, res)=>{

	Model.addProfile(req.body).then(()=>{
		res.redirect('/profiles')
	}).catch(err=>{
		Model.getAllProfileContact().then(result=>{
			let message = "Your contact already have profile"
			res.render('profile', {profiles : result[0], contacts : result[1], message})
		})
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getProfileContactById(req.params.id).then(profile=>{
		Contact.getAllContact().then(contacts=>{
			res.render('editProfile', {profile, contacts})
		})
	}).catch(err=>{
			console.log(err);
		})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editProfile(req.body).then(()=>{
		res.redirect('/profiles')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteProfile(req.params.id).then(()=>{
		res.redirect('/profiles')
	})
})

module.exports = router