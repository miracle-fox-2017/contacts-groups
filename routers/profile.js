const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Contact = require('../models/contacts');

router.get('/', (req, res) => {
  Profile.findAll(dataProfile => {
    Contact.findAll(dataContacts => {
      res.render('profiles.ejs', { dataProfile: dataProfile, dataContacts: dataContacts });
    });
  });
});

module.exports = router;
