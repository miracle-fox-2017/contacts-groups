const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

const getProfiles = (req, res) => {
  db.all(`SELECT * FROM Profile`, (err, rows) => {
    if (err) throw err;
    res.render('profiles', {profiles: rows});
  });
};

const postProfiles = (req, res) => {
  const query = `INSERT INTO Profile (username, password)
                VALUES ('${req.body.username}', '${req.body.password}')`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
};

const getEditProfiles = (req, res) => {
  db.get(`SELECT * FROM Profile WHERE id IS ${req.params.id}`, (err, row) => {
    if (err) throw err;
    res.render('profiles-edit', row);
  });
};

const postEditProfiles = (req, res) => {
  const query = `UPDATE Profile SET
                  username = '${req.body.username}',
                  password = '${req.body.password}'
                WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
};

const deleteProfiles = (req, res) => {
  const query = `DELETE FROM Profile WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
};

module.exports = {
  getProfiles,
  postProfiles,
  getEditProfiles,
  postEditProfiles,
  deleteProfiles
};