const express = require('express')
const router = express.Router()
const Address = require('./../models/modelAddress')
const Contact = require('./../models/modelContact')
const Profile = require('./../models/modelProfile')

router.get('/', function (req, res) {
    Address.getDataContact().then((dataAddress) => {
        res.render('address', { dataAddress: dataAddress })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/add', function (req, res) {
    Contact.findAll().then((dataContact) => {
        res.render('address-add', { dataContact: dataContact })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/add', function (req, res) {
    Address.create(req.body).then(() => {
        res.redirect('../addresses')
    }).catch(reason => {
        res.send(reason)
    })
})

router.get('/edit/:id', function (req, res) {
    Promise.all([
        Address.findById(req.params.id),
        Contact.findAll()
    ]).then((result) => {
        res.render('address-edit', { dataAddress: result[0], dataContact: result[1] })
    }).catch((reason) => {
        res.send(reason)
    })

})

router.post('/edit/:id', function (req, res) {
    Address.updateData(req.params.id, req.body).then(() => {
        res.redirect('../../addresses')
    }).catch((reason) => {
        res.send(reason)
    })

})

router.get('/delete/:id', function (req, res) {
    Address.removeData(req.params.id).then(() => {
        res.redirect('../../addresses')
    }).catch((reason) => {
        res.send(reason)
    })
})

module.exports = router