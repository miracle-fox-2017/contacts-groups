const express = require('express')
const router = express.Router()
const Group = require('./../models/modelGroup')
const ContactGroup = require('./../models/modelContactGroup')
const Contact = require('./../models/modelContact')

router.get('/', function (req, res) {
    Group.getData((data) => {
        ContactGroup.getGroupContact((data), (dataGroup) => {
            res.render('group', { dataGroup: dataGroup })
        })
    })
})

router.get('/add', function (req, res) {
    res.render('group-add')
})

router.post('/add', function (req, res) {
    Group.addData(req.body)
    res.redirect('../groups')
})

router.get('/edit/:id', function (req, res) {
    Group.getDataById((data) => {
        res.render('group-edit', { dataGroup: data })
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Group.updateData(req.params.id, req.body)
    res.redirect('../../groups')
})

router.get('/delete/:id', function (req, res) {
    Group.deleteData(req.params.id, () => {
        ContactGroup.removeDataByIdGroup(req.params.id, () => {
            res.redirect('../../groups')
        })
    })

})

router.get('/assign_contacts/:id', function (req, res) {
    Group.getDataById((data) => {
        Contact.getData((dataContact) => {
            res.render('group-contact', { dataGroup: data, dataContact: dataContact })
        })
    }, req.params.id)
})
router.post('/assign_contacts/:id', function (req, res) {
    ContactGroup.addData(req.params.id, req.body.idContact)
    res.redirect('../../groups')
})


module.exports = router