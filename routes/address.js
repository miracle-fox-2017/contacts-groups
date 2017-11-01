const router = require('express').Router();
const Address = require('../models/address');
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  Contacts.findAllContacts()
    .then(contactRecords => {
      Address.findAllAddress()
        .then(addressRecords => {
          res.render('address', {
            addresses: addressRecords,
            contacts: contactRecords
          });
        }).catch(err => {
          console.error(err);
        });
    }).catch(err => {
      console.error(err);
    });
});

router.post('/', (req, res) => {
  const dataBody = {
    id: req.body.id,
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode
  };

  Address.createAddress(dataBody)
    .then(() => {
      res.redirect('/address');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Address.editAddress(dataBody)
    .then(data => {
      res.render('address-edit', data);
    }).catch(err => {
      console.error(err);
    });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode
  };

  Address.updateAddress(dataBody)
    .then(() => {
      res.redirect('/address');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Address.deleteAddress(dataBody)
    .then(() => {
      res.redirect('/address');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/with-contact', (req, res) => {
  /* Address.findAddressWithContacts((err, recordsObj) => {
    if (err) console.error(err);

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
  }); */

  Address.findAllAddress()
    .then(addressRecords => {
      // console.log(addressRecords);
      const contactAddress = [];

      addressRecords.forEach(address => {
        const adr = {
          id: address.id_contact
        };

        Contacts.editContacts(adr)
          .then(contactRecords => {
            // console.log(contactRecords);
            const dataObj = {
              id: address.id,
              name: contactRecords.name,
              street: address.street,
              city: address.city,
              zipcode: address.zipcode,
              company: contactRecords.company
            };

            contactAddress.push(dataObj);
            // console.log(contactAddress);

            res.render('address-with-contact', { contactAddresses : contactAddress });
          }).catch(err => {
            console.error(err);
          });
      });
    }).catch(err => {
      console.error(err);
    });
});

module.exports = router;