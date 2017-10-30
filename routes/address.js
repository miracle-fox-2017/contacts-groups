const router = require('express').Router();
const Address = require('../models/address');
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  Contacts.findAllContacts((err, contactRecords) => {
    Address.findAllAddress((err, addressRecords) => {
      if (err) throw err;
      res.render('address', {
        addresses: addressRecords,
        contacts: contactRecords
      });
    });
  });
});

router.post('/', (req, res) => {
  const dataBody = {
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode,
    id: req.body.id
  };

  Address.createAddress(dataBody, err => {
    if (err) throw err;
    res.redirect('/address');
  });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }

  Address.editAddress(dataBody, (err, data) => {
    if (err) throw err;
    res.render('address-edit', data);
  });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode
  }

  Address.updateAddress(dataBody, err => {
    if (err) throw err;
    res.redirect('/address');
  });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }
  
  Address.deleteAddress(dataBody, err => {
    if (err) throw err;
    res.redirect('/address');
  });
});

router.get('/with-contact', (req, res) => {
  Address.findAddressWithContacts((err, recordsObj) => {
    if (err) console.log(err);
    
    const contactAddress = [];
    for (let i = 0; i < recordsObj.address.length; i++) {
      for (let j = 0; j < recordsObj.contacts.length; j++) {
        const dataObj = {};

        if (recordsObj.address[i].id_contact === recordsObj.contacts[j].id) {
          dataObj['name'] = recordsObj.contacts[j].name;
          dataObj['id'] = recordsObj.address[i].id;
          dataObj['street'] = recordsObj.address[i].street;
          dataObj['city'] = recordsObj.address[i].city;
          dataObj['zipcode'] = recordsObj.address[i].zipcode;
          dataObj['company'] = recordsObj.contacts[j].company;
        }

        contactAddress.push(dataObj);
      }
    }

    res.render('address-with-contact', {
      contactAddresses: contactAddress
    });
  });
});

module.exports = router;