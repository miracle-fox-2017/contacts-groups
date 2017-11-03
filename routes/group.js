const express = require('express')
const router = express.Router()
const Group = require('./../models/modelGroup')
const ContactGroup = require('./../models/modelContactGroup')
const Contact = require('./../models/modelContact')

router.get('/', function (req, res) {
    ContactGroup.findGroupContact().then((dataGroup) => {
        res.render('group', { dataGroup: dataGroup })
    }).catch(reason => {
        res.send(reason)
    })
})

router.get('/add', function (req, res) {
    res.render('group-add')
})

router.post('/add', function (req, res) {
    Group.create(req.body).then(() => {
        res.redirect('../groups')
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/edit/:id', function (req, res) {
    Group.findById(req.params.id).then((dataGroup) => {
        res.render('group-edit', { dataGroup: dataGroup })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/edit/:id', function (req, res) {
    Group.updateData(req.params.id, req.body).then(() => {
        res.redirect('../../groups')
    }).catch((reason) => {
        res.send(reason)
    })
})

router.get('/delete/:id', function (req, res) {
    Group.removeData(req.params.id).then(() => {
        res.redirect("../../groups")
    })

})

router.get('/assign_contacts/:id', function (req, res) {
    Promise.all([
        Group.findById(req.params.id),
        Contact.findAll()
    ]).then((dataResult) => {
        res.render('group-contact', { dataGroup: dataResult[0], dataContact: dataResult[1] })
    }).catch((reason) => {
        res.send(reason)
    })
})

router.post('/assign_contacts/:id', function (req, res) {
    ContactGroup.create(req.params.id, req.body.idContact).then(() => {
        res.redirect('../../groups')
    }).catch((reason) => {
        res.send(reason)
    })
})


module.exports = router