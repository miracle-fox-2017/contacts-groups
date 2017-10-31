const express = require('express');
const router = express.Router();
const addresses = require('../models/addressModel');


// ADDRESSES ROUTER
// =====================================================================

router.get('/', (req, res) =>
  {
    addresses.select( (addressesData) =>
      {
        res.render('addresses', {addressesData})
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