const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});

const getGroups = (req, res) => {
  db.all(`SELECT * FROM Groups`, (err, rows) => {
    // console.log(rows);
    if (err) throw err;
    res.render('groups', {groups: rows});
  });
};

const postGroups = (req, res) => {
  const query = `INSERT INTO Groups (name_of_group)
                VALUES ('${req.body.name}')`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
};

const getEditGroups = (req, res) => {
  db.get(`SELECT * FROM Groups WHERE id IS ${req.params.id}`, (err, row) => {
    if (err) throw err;
    res.render('groups-edit', row);
  });
};

const postEditGroups = (req, res) => {
  const query = `UPDATE Groups
                SET name_of_group = '${req.body.name}'
                WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
};

const deleteGroups = (req, res) => {
  const query = `DELETE FROM Groups WHERE id IS ${req.params.id}`;
  db.run(query, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
};

module.exports = {
  getGroups,
  postGroups,
  getEditGroups,
  postEditGroups,
  deleteGroups
};