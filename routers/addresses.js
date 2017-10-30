const express = require('express');
const Addresses = require('../models/addresses');
const Contact = require('../models/contact');
const router = express.Router();

router.get('/addresses', function (req, res) {
    Addresses.findAll(function (err, rowsAddresses) {
        if (!err) {
            res.render('addresses', { rowsAddresses });
        } else {
            res.send(err)
        }
    });
});

router.get('/addresses/add', function (req, res) {
    Contact.findAll(function (err, rowsContacts) {
        if (!err) {
            res.render('addaddresses', { rowsContacts });
        } else {
            res.send(err);
        }

    });
});

router.post('/addresses/add', function (req, res) {

    let obj = {
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        idcontact: req.body.idcontact,
    }

    Addresses.createData(obj, function (err, rowsAddresses) {
        res.redirect('/addresses');
    });

});

router.get('/addresses/edit/:id', function (req, res) {
    Addresses.findAllWhere(req.params.id, function (err, rowsAddresses) {
        if (!err) {
            Contact.findAll(function (err, rowsContacts) {
                if (!err) {
                    res.render('editaddresses', { rowsAddresses, rowsContacts });
                } else {
                    res.send("---contac" + err);
                }
            });
        } else {
            res.send("---" + err);
        }
    });
});

router.post('/addresses/edit/:id', function (req, res) {

    let obj = {
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        idcontact: req.body.idcontact,
        id: req.params.id,
    }
    Addresses.updateData(obj);

    res.redirect('/addresses');

});

router.get('/addresses/hapus/:id', function (req, res) {
    Addresses.removeData(req.params.id);
    res.redirect('/addresses');
});

module.exports = router;