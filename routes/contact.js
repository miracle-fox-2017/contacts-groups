const express = require('express')
const router = express.Router()
const Contact = require('./../models/modelContact')
const ContactGroup = require('./../models/modelContactGroup')
const Group = require('./../models/modelGroup')
const Address = require('./../models/modelAddress')

router.get('/', function (req, res) {
    ContactGroup.findContactGroup().then((contactGroup) => {
        res.render('contact', { dataContact: contactGroup })
    }).catch((reason) => {
        console.log(reason)
    })
})

router.get('/add', function (req, res) {
    Group.findAll().then((dataGroup) => {
        res.render('contact-add', { dataGroup: dataGroup, message: '' })
    }).catch((err) => {
        res.render('contact-add', { message: err })
    })

})

router.post('/add', function (req, res) {
    Contact.create(req.body).then((idContact) => {
        ContactGroup.create(req.body.idGroup, idContact).then(() => {
            res.redirect('../contacts')
        })
    })
})

router.get('/edit/:id', function (req, res) {
    Contact.findById(req.params.id).then((dataContact) => {
        res.render('contact-edit', { dataContact: dataContact })
    })
})

router.post('/edit/:id', function (req, res) {
    Contact.updateData(req.params.id, req.body).then(() => {
        res.redirect('../../contacts')
    }).catch((reason) => {
        res.send(reason)
    })
})
router.get('/delete/:id', function (req, res) {
    Contact.removeData(req.params.id).then(() => {
        res.redirect('../../contacts')
    }).catch((reason) => {
        res.send(reason)
    })

})

router.get('/addresses/:id', function (req, res) {
    Address.findContactAddress(req.params.id).then((dataContact) => {
        res.render('address-contact', {dataContact : dataContact})
    })
})


module.exports = router