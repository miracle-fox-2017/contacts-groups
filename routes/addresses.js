const express = require('express')
const router = express.Router()
const Model = require('../models/addressesModel')

router.get('/', (req, res)=>{
	Model.getAllAddress(result=>{
		res.render('address', {addresses : result})
	})
})

router.post('/', (req, res)=>{
	Model.addAddress(req.body, ()=>{
		res.redirect('/addresses')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getAddressById(req.params.id, result=>{
		res.render('editAddress', {address : result})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editAddress(req.body, err=>{
		if(!err){
			res.redirect('/addresses')	
		}else{
			console.log(err);
		}
	})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteAddress(req.params.id, ()=>{
		res.redirect('/addresses')
	})
})

module.exports = router