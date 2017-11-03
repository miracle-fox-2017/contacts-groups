const express = require('express');
const router = express.Router();
const addresses = require('../models/addressModel');
const contacts = require('../models/contactsModel');


// ADDRESSES ROUTER
// =====================================================================

router.get('/', (req, res) =>
  {
    addresses.leftJoin( (addressesData) =>
      {
        contacts.select( (contactsData) =>
          {
            res.render('addresses', {addressesData : addressesData, contactsData : contactsData, error : false});
          }
        )
      }
    );
  }
);

router.post(`/`, (req, res) =>
  {
    addresses.add(req.body);
    res.redirect(`addresses`);
  }
);

router.get('/edit/:id', (req, res) =>
  {
    addresses.select( (addressData) =>
      {
        res.render('addressesEdit', {addressData})
      },`*`,req.params.id);
  }
);

router.get(`/addresses_with_contact/`, (req,res) =>{
  addresses.select((addressesData) => {
    let arrObj = [];
    addressesData.forEach((addressData, index) => {
      contacts.select((contactData) => {
        addressData.name = contactData.name;
        addressData.company = contactData.company;
        arrObj.push(addressData);
        if (index === addressesData.length - 1) {
          res.render('addresses_with_contact', {boom : arrObj});
        }
      },`name, company`, addressData.ContactID)
    })
  })
});

router.post('/edit/:id', (req, res) =>
  {
    addresses.update(req.body);
    res.redirect('/addresses');
  }
)

router.get('/delete/:id', (req, res) =>
  {
    addresses.deleteQuery(req.params.id);
    res.redirect('/addresses');
  }
)


module.exports = router;