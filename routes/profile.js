const express = require('express')
const router = express.Router()
const Profile = require('./../models/modelProfile')
const Contact = require('./../models/modelContact')

router.get('/', function (req, res) {
    Profile.getDataContact().then((dataProfile) => {
        res.render('profile', { dataProfile: dataProfile })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/add', function (req, res) {
    Contact.findAll().then((dataContact) => {
        res.render('profile-add', { dataContact: dataContact, message: '' })
    }).catch((reason) => {
        res.send(reason)
    })

})

router.post('/add', function (req, res) {
    Profile.create(req.body).then(() => {
        res.redirect('../../profiles')
    }).catch((reason) => {
        Contact.findAll().then((dataContact) => {
            res.render('profile-add', { dataContact: dataContact, message: reason })
        })
    })
})

router.get('/edit/:id', function (req, res) {
    Promise.all([
        Profile.findById(req.params.id),
        Contact.findAll()
    ]).then((result) => {
        res.render('profile-edit', { dataProfile: result[0], dataContact: result[1], message: '' })
    }).catch((reason) => {
        res.send(reason)
    })

})

router.post('/edit/:id', function (req, res) {
    Profile.updateData(req.params.id, req.body).then(() => {
        res.redirect('../../profiles')
    }).catch(reason => {
        Promise.all([
            Profile.findById(req.params.id),
            Contact.findAll()
        ]).then((result) => {
            res.render('profile-edit', { dataProfile: result[0], dataContact: result[1], message: reason })
        })
    })
})

router.get('/delete/:id', function (req, res) {
    Profile.removeData(req.params.id).then(() => {
        res.redirect('../../profiles')
    }).catch((reason) => {
        res.send(reason)
    })
})

module.exports = router