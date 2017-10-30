const express = require('express')
const router = express.Router()
const Address = require('./../models/modelAddress')
const Contact = require('./../models/modelContact')
const Profile = require('./../models/modelProfile')

router.get('/', function (req, res) {
    Address.getData((err, dataAddress) => {
        if (err) {
            res.render('address', { Error: err })

        } else {
            Contact.getData((dataContact) => {
                res.render('address', { dataAddress: dataAddress, dataContact: dataContact })
            })
        }
    })
})
router.get('/add', function (req, res) {
    Contact.getData((dataContact) => {
        res.render('address-add', { dataContact: dataContact })
    })

})

router.post('/add', function (req, res) {
    Address.addData(req.body)
    res.redirect('../../addresses')
})

router.get('/edit/:id', function (req, res) {
    Address.getDataById((data) => {
        Contact.getData((dataContact) => {
            res.render('address-edit', { dataAddress: data, dataContact: dataContact })
        })
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Address.updateData(req.params.id, req.body)
    res.redirect('../../addresses')
})

router.get('/delete/:id', function (req, res) {
    Address.deleteData(req.params.id)
    res.redirect('../../addresses')
})

module.exports = router