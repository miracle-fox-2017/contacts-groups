const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

const getAddress = (req, res) => {
  db.all(`SELECT * FROM addresses`, (err, rows) => {
    if (err) throw err;
    res.render('address', {addresses: rows});
  });
};

const postAddress = (req, res) => {
  const query = `INSERT INTO Addresses (street, city, zipcode)
                VALUES ('${req.body.street}', '${req.body.city}', ${req.body.zipcode})`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/address');
  });
};

const getEditAddress = (req, res) => {
  db.get(`SELECT * FROM Addresses WHERE id IS ${req.params.id}`, (err, row) => {
    if (err) throw err;
    res.render('address-edit', row);
  });
};

const postEditAddress = (req, res) => {
  const query = `UPDATE Addresses SET
                  street = '${req.body.street}',
                  city = '${req.body.city}',
                  zipcode = '${req.body.zipcode}'
                WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/address');
  });
};

const deleteAddress = (req, res) => {
  const query = `DELETE FROM Addresses WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/address');
  });
};

module.exports = {
  getAddress,
  postAddress,
  getEditAddress,
  postEditAddress,
  deleteAddress
};