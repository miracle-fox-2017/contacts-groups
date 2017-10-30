const express = require('express')
const router = express.Router()
const Profile = require('./../models/modelProfile')
const Contact = require('./../models/modelContact')

router.get('/', function (req, res) {
    Profile.getData((data) => {
        res.render('profile', { dataProfile: data })
    })
})

router.get('/add', function (req, res) {
    Contact.getData((data) => {
        res.render('profile-add', { dataContact: data, message: '' })
    })

})

router.post('/add', function (req, res) {
    Profile.addData((err) => {
        if (err) {
            Contact.getData((data) => {
                res.render('profile-add', { dataContact: data, message: 'Your contact already has profile' })
            })
        } else {
            res.redirect('../profiles')
        }
    }, req.body)

})

router.get('/edit/:id', function (req, res) {
    Profile.getDataById((dataProfile) => {
        Contact.getData((dataContact) => {
            res.render('profile-edit', { dataProfile: dataProfile, dataContact: dataContact, message: '' })
        })

    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Profile.updateData((err) => {
        if (err) {
            Profile.getDataById((dataProfile) => {
                Contact.getData((dataContact) => {
                    res.render('profile-edit', { dataProfile: dataProfile, dataContact: dataContact, message: 'Your contact already has profile' })
                })
            }, req.params.id)
        } else {
            res.redirect('../../profiles')
        }
    }, req.params.id, req.body)
})

router.get('/delete/:id', function (req, res) {
    Profile.deleteData(req.params.id)
    res.redirect('../../profiles')
})

module.exports = router