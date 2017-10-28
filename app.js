const bodyParser = require('body-parser');
const express = require('express');
const sqlite3=require("sqlite3").verbose();

const app = express();
const db=new sqlite3.Database("./database/database.db");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));
// app.use(express.static(__dirname));
app.use(express.static("./views"));

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine


// ------- INDEX ------
app.get('/', function(req, res) {
  res.render('index', {error: false})
})

// ----- CONTACTS -----
// SHOW
app.get('/contacts', function (req, res) {
  let query = `SELECT * FROM contacts`;
  db.all(query, (err, rows)=>{
    res.render('contacts',{rows});
  })

})

// INSERT
app.post('/contacts', function(req, res) {
  let name = req.body.name;
  let company = req.body.company;
  let telp = req.body.telp;
  let email = req.body.email;

  db.run(`INSERT INTO contacts (name, company, telp, email) VALUES ('${name}', '${company}', '${telp}', '${email}')`, ()=>{
    res.redirect('/contacts');
  });
})

// UPDATE
app.get('/contacts/edit/:id', (req, res)=>{
  let query = `SELECT * FROM contacts WHERE id = '${req.params.id}'`
  db.all(query, (err, rows)=>{
    res.render('contacts-edit',{rows});
  });
})

app.post('/contacts/edit/:id', (req, res)=>{
  let id = req.body.id;
  let name = req.body.name;
  let company = req.body.company;
  let telp = req.body.telp;
  let email = req.body.email;

  db.run(`UPDATE contacts SET
              name = '${name}',
              company = '${company}',
              telp = '${telp}',
              email = '${email}'
              WHERE
              id = '${id}' `);
  res.redirect('/contacts');
})

// DELETE
app.get('/contacts/delete/:id', (req, res)=>{
  let id = req.params.id;
  let query = `DELETE FROM contacts where id = ${id}`

  db.run(query, ()=>{
    res.redirect('/contacts')
  })
})


// GROUPS
// SELECT
app.get('/groups', (req, res)=>{
  let query = `SELECT * FROM groups`;

  db.all(query, (err, rows)=>{
    res.render('groups', {rows})
  })
})

// INSERT
app.post('/groups', (req, res)=>{
  let name = req.body.name;
  let query = `INSERT INTO
               groups (name_of_group)
               VALUES
               ('${name}')`

  db.run(query, ()=>{
    res.redirect('/groups')
  })
})

// UPDATE
app.get('/groups/edit/:id', (req, res)=>{
  let query = `SELECT * FROM groups WHERE id = '${req.param.id}'`

  db.all(query, (err, rows)=>{
    res.render('groups-edit', {rows}) // groups-edit adalah nama_file
  })
})

app.post('groups/edit/:id', (req, res)=>{
  let id    = req.body.id;
  let name  = req.body.name;
  let query = `UPDATE groups SET name = '${name}' where id = '${id}'`

  db.run(query, ()=>{
    res.redirect('/groups')
  })
})


// DELETE
app.get('/groups/delete/:id', (req, res)=>{
  let id = req.params.id;
  let query = `DELETE FROM groups WHERE id = '${id}'`
  db.run(query,()=>{
    res.redirect('/groups')
  })
})

// LOCALHOST CONNECTION
app.listen(3000, function() {
  console.log('Sedang Berjalan .....!!!!!');
})
