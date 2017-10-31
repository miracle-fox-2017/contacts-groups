const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();


router.get('/contact', function (req, res) {
    Contact.findAll(function (err, rowsContacts) {
        res.render('contact', { rowsContacts });
    });
});

router.get('/contact/add', function (req, res) {
    let error = { error: null };
    res.render('addcontact', { error });
});

router.post('/contact/add', function (req, res) {
    let obj = {
        nama: req.body.nama,
        company: req.body.company,
        telp: req.body.telp,
        email: req.body.email,
    }

    Contact.createData(obj, function (ID) {
        res.redirect('/contact');
    });

});

router.get('/contact/edit/:id', function (req, res) {
    Contact.findAllWhere(req.params.id, function (err, rowsContacts) {
        if (!err) {
            res.render('editcontact', { rowsContacts });
            // console.log(rowsContacts);
        } else {
            res.send(err);
        }

    });
});

router.post('/contact/edit/:id', function (req, res) {
    let obj = {
        nama: req.body.nama,
        company: req.body.company,
        telp: req.body.telp,
        email: req.body.email,
        id: req.params.id,
    }

    Contact.updateData(obj);
    res.redirect('/contact');

});

router.get('/contact/hapus/:id', function (req, res) {
    Contact.removeData(req.params.id);
    res.redirect('/contact');
});

module.exports = router;