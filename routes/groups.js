const express = require('express')
const router = express.Router()
const Model = require('../models/groupsModel')

router.get('/', (req, res)=>{
	Model.getAllGroup(rows=>{
		res.render('group', {group : rows})
	})
})

router.post('/', (req, res)=>{
	Model.addGroup(req.body.name, ()=>{
		res.redirect('/groups')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getGroupById(req.params.id, result=>{
		res.render('editGroup', {group : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editGroup(req.body, ()=>{
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteGroup(req.params.id, ()=>{
		res.redirect('/groups')
	})
})

module.exports = router