const express = require('express')
const router = express.Router()
const Model = require('../models/profilesModel')

router.get('/', (req, res)=>{
	Model.getAllProfile(rows=>{
		res.render('profile', {profiles : rows})
	})
})

router.post('/', (req, res)=>{
	Model.addProfile(req.body, ()=>{
		res.redirect('/profiles')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getProfileById(req.params.id, result=>{
		res.render('editProfile', {profile : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editProfile(req.body, ()=>{
		res.redirect('/profiles')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteProfile(req.params.id, ()=>{
		res.redirect('/profiles')
	})
})

module.exports = router