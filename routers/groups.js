const express = require('express');
const Groups = require('../models/groups');
const router = express.Router();

router.get('/groups', function (req, res) {
    Groups.findAll(function (err, rowsGroups) {
        res.render('groups', { rowsGroups });
    })

});

router.get('/groups/add', function (req, res) {
    res.render('addgroups');
});

router.post('/groups/add', function (req, res) {
    let obj = {
        nama: req.body.nama
    }
    Groups.createData(obj, function (ID) {
        res.redirect('/groups');
    });
});

router.get('/groups/edit/:id', function (req, res) {
    Groups.findAllWhere(req.params.id, function (err, rowsGroups) {
        if (!err) {
            res.render('editgroups', { rowsGroups });
        } else {
            res.send(err);
        }
    });
});

router.post('/groups/edit/:id', function (req, res) {
    let obj = {
        nama: req.body.nama,
        id: req.params.id,
    }
    Groups.updateData(obj);
    res.redirect('/groups');
});

router.get('/groups/hapus/:id', function (req, res) {
    Groups.removeData(req.params.id);
    res.redirect('/groups');
});

module.exports = router;