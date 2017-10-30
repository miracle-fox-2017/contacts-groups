const express = require('express')
const router = express.Router()
const Contact = require('./../models/modelContact')
const ContactGroup = require('./../models/modelContactGroup')
const Group = require('./../models/modelGroup')
const Address = require('./../models/modelAddress')

router.get('/', function (req, res) {
    Contact.getData((data) => {
        ContactGroup.getContactGroup((data), (dataResult) => {
            res.render('contact', { dataContact: dataResult })
        })
    })
})

router.get('/add', function (req, res) {
    Group.getData((data) => {
        res.render('contact-add', { message: '', dataGroup: data })
    })
})

router.post('/add', function (req, res) {
    if (req.body.name === '') {
        res.render('contact-add', { message: "Name required!" })
    } else {
        Contact.addData(req.body, (lastId) => {
            ContactGroup.addData(req.body.idGroup, lastId)
            res.redirect('../contacts')
        })
    }
})

router.get('/edit/:id', function (req, res) {
    Contact.getDataById((data) => {
        res.render('contact-edit', { dataContact: data })
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Contact.updateData(req.params.id, req.body)
    res.redirect('../../contacts')
})
router.get('/delete/:id', function (req, res) {
    Contact.deleteData(req.params.id)
    res.redirect('../../contacts')
})

router.get('/addresses/:id', function (req, res) {
    Contact.getDataById((data) => {
        Address.getDataAddressContact((dataAddress) => {
            res.render('address-contact', { dataContact: data, dataAddress: dataAddress })
        }, data.id)
    }, req.params.id)
})


module.exports = router