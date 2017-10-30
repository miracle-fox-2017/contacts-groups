const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const ContactsGroups = require('../models/contacts_groups');

//menampilkan semua data contacts
router.get('/', function (req, res) {
  Contact.findAll(dataContacts => {
    Group.findAll(dataGroups => {
      ContactsGroups.findAll(dataContactsGroups => {
        res.render('contacts.ejs', { error: null, dataContacts: dataContacts, dataGroups: dataGroups, dataContactsGroups: dataContactsGroups });
      });
    });
  });
});

module.exports = router;
