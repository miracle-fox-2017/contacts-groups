const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const ContactsGroups = require('../models/contacts_groups');

// menampilkan data groups
router.get('/', function (req, res) {
  Group.findAll(dataGroups => {
    ContactsGroups.findName(dataContactsGroups => {
      Contact.findAll(dataContacts => {
        res.render('groups.ejs', { dataGroups: dataGroups, dataContacts: dataContacts, dataContactsGroups: dataContactsGroups });
      });
    });
  });
});

module.exports = router;
