const express = require('express')
const router = express.Router()
const Model = require('../models/addressesModel')
const Contact = require('../models/contactsModel')

router.get('/', (req, res)=>{
	Model.getAllAddressContact().then(result=>{
		// res.send(result)
		res.render('address', {addresses : result[0], contacts : result[1]})
	})
})

router.post('/', (req, res)=>{
	Model.addAddress(req.body).then(()=>{
		res.redirect('/addresses')
	})
})

router.get('/edit/:id', (req, res)=>{
	Model.getAddressContactById(req.params.id).then(address=>{
		Contact.getAllContact().then(contacts=>{
			res.render('editAddress', {address, contacts})
		})
	})
})

router.post('/edit/:id', (req, res)=>{
	req.body.id = req.params.id
	Model.editAddress(req.body).then(()=>{
			res.redirect('/addresses')	
		}).catch(err=>{
			console.log(err)
		})
})

router.get('/delete/:id', (req, res)=>{
	Model.deleteAddress(req.params.id).then(()=>{
		res.redirect('/addresses')
	}).catch(err=>{
		console.log(err);
	})
})

module.exports = router