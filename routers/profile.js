const express = require('express');
const Profile = require('../models/profile');
const Contact = require('../models/contact');
const router = express.Router();

router.get('/profile', function (req, res) {
    Profile.findAll(function (err, rowsProfile) {
        if (!err) {
            res.render('profile', { rowsProfile });
        } else {
            res.send(err);
        }

    });
});

router.get('/profile/add', function (req, res) {
    Contact.findAll(function (err, rowsContacts) {
        res.render('addprofile', { rowsContacts });
    });
});

router.post('/profile/add', function (req, res) {

    let obj = {
        idcontact: req.body.idcontact,
        nama: req.body.nama,
        password: req.body.password
    }

    Profile.createData(obj, function (err, rowsProfile) {
        // console.log(req.body.nama)

        res.redirect('/profile');

    });

});

router.get('/profile/edit/:id', function (req, res) {
    Profile.findAllWhere(req.params.id, function (err, rowsProfile) {
        Contact.findAll(function (err, rowsCountact) {
            res.render('editprofile', { rowsProfile, rowsCountact });
        })
    });
});

router.post('/profile/edit/:id', function (req, res) {
    let obj = {
        nama: req.body.nama,
        password: req.body.password,
        id: req.params.id,
    }

    Profile.updateData(obj)
    // console.log(req.body.nama)
    res.redirect('/profile');

});

router.get('/profile/hapus/:id', function (req, res) {
    db.all(profile.hapusData(req.params.id), function (err, rowsProfile) {

        res.redirect('/profile');
    });
});

module.exports = router;