const express = require('express')
const router = express.Router()
const Group = require('../models/group')

router.get('/', (req, res)=>{
	Group.read(data=>{
		res.render('groups/list', {group : data})
	})
})

router.get('/edit/:id', (req, res)=>{

	Group.select_by_id(req.params, (data)=>{
		res.render('groups/edit', {group : data})
	})
})

router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		name_of_group	: req.body.name_of_group,
	}

	console.log('ini di router', obj)
	Group.update(obj, (data)=>{
		res.redirect('/groups')
	})
})

router.get('/delete/:id', (req, res)=>{
	Group.delete(req.params, data=>{
		console.log(data)
	})
})


module.exports = router