const express = require('express')
const router = express.Router()
const Addresses = require('../models/address')
const Contact = require('../models/contact')

router.get('/', (req, res)=>{

		Promise.all([
			Addresses.findAll(),
			Contact.findAll()
		]).then(object =>{

				object[0].forEach(address =>{
					object[1].forEach(contact =>{
						if(address.id_contact == contact.id){
							address.name = contact.name
						}
					})
				})
				res.render('addresses/list', {addresses : object[0], contacts : object[1]})
			}).catch(error =>{
				console.log(error)
			})
})

router.get('/add', (req, res)=>{
	Contact.findAll().then(contact=>{
		res.render('addresses/add', {contact, error : is_error = false})
	})
	.catch(error =>{
				console.log(error)
		})
})

router.post('/add', (req, res)=>{
	let obj = {
		street : req.body.street,
		city : req.body.city,
		zipcode : req.body.zipcode,
		id_contact : req.body.id_contact
	}

	Addresses.create(obj).then(data=>{
		res.redirect('/addresses')		
	})
	.catch(error =>{
				console.log(error)
			})
})


router.get('/edit/:id', (req, res)=>{

	Addresses.findById(req.params).then(addresses =>{
		Contact.findAll().then(contact =>{
			console.log(addresses)
			res.render('addresses/edit', {addresses, contact})
		})
	})
	.catch(error =>{
				console.log(error)
			})	

})


router.post('/edit/:id', (req, res)=>{
	let obj = {
		id	: req.params.id,
		street	: req.body.street,
		city : req.body.city,
		zipcode : req.body.zipcode,
		id_contact : req.body.id_contact
	}

	Addresses.update(obj).then(data =>{
		res.redirect('/addresses')
	})
})

router.get('/delete/:id', (req, res)=>{
	Addresses.delete(req.params, data=>{
		res.redirect('/addresses')
	})
	.catch(error =>{
				console.log(error)
			})
})


module.exports = router