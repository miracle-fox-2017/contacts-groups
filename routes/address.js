const router = require('express').Router();
const Address = require('../models/address');

router.get('/', (req, res) => {
  Address.findAllAddress((err, records) => {
    if (err) throw err;
    res.render('address', {addresses: records});
  });
});

router.post('/', (req, res) => {
  const dataBody = {
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode
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

module.exports = router;