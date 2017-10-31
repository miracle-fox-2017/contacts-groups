const express = require('express');
const Addresses = require('../models/addresses');
const Contact = require('../models/contact');
const router = express.Router();

router.get('/addresses_with_contact/:id', function (req, res) {
    Addresses.findAllWithContact(req.params.id, function (err, rowsAddresses) {
        if (!err) {
            rowsAddresses.forEach(function (element, index) {
                Contact.findAllWhere(element.idcontact, function (err, rowsContacts) {
                    if (!err) {                  
                        rowsAddresses[index].nama = rowsContacts.name;
                        if (index === rowsAddresses.length-1){
                            res.render('withcontact', { rowsAddresses, rowsContacts});
                        }

                    }
                }); 
            });                   
        }

    });
});

module.exports = router;