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
// SELECT
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


// ----------- GROUPS --------------
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
  let query = `SELECT * FROM groups WHERE id = '${req.params.id}'`

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

// -------- ADDRESS ----------
// SELECT
app.get('/address', (req, res)=>{
  let query = `SELECT * FROM address`;

  db.all(query, (err, rows)=>{
    res.render('address', {rows})
  })
})

// INSERT
app.post('/address', (req, res)=>{
  let street = req.body.street;
  let city = req.body.city;
  let zipcode = req.body.zipcode;

  let query = `INSERT INTO address
              (street, city, zipcode)
              VALUES
              ('${street}', '${city}' , '${zipcode}') `;

  db.run(query, ()=>{
    res.redirect('/address');
  })

})

// UPDATE
app.get('/address/edit/:id', (req, res)=>{
  let query = `SELECT * FROM address WHERE id = '${req.params.id}'`

  db.all(query, (err, rows)=>{
    res.render('address-edit', {rows})
  })
})

app.post('/address/edit/:id', (req, res)=>{
  let id = req.body.id;
  let street = req.body.street;
  let city = req.body.city;
  let zipcode = req.body.zipcode;


  let query = `UPDATE address SET street = '${street}', city = '${city}', zipcode = '${zipcode}' WHERE id = '${id}'`;

  db.run(query, ()=>{
    res.redirect('/address');
  });

})

// DELETE
app.get('/address/delete/:id', (req, res)=>{
  let id = req.params.id;
  let query = `DELETE FROM address WHERE id = '${id}'`

  db.run(query,()=>{
    res.redirect('/address')
  })
})

// --------PROFILE-------
// SELECT
app.get('/profiles', (req, res)=>{
  let query = `SELECT * FROM profile`;

  db.all(query, (err, rows)=>{
    res.render('profile', {rows})
  })
})

// INSERT
app.post('/profiles', (req, res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let query = `INSERT INTO
              profile (username, password)
              VALUES
              ('${username}', '${password}')`;


  db.run(query, ()=>{
    res.redirect('/profiles');
  })

})

// UPDATE
app.get('/profiles/edit/:id', (req, res)=>{
  let id = req.params.id;
  let query = `SELECT * FROM profile WHERE id = '${id}'`;

  db.all(query, (err, rows)=>{
    res.render('profile-edit', {rows});
  })
})

app.post('/profiles/edit/:id', (req, res)=>{
  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  let query = `UPDATE profile
              SET
              username = '${username}', password = '${password}'
              WHERE
              id = '${id}'`;

  db.run(query, ()=>{
    res.redirect('/profiles');
  })

  // DELETE
  app.get('/profiles/delete/:id', (req, res)=>{
    let id = req.params.id;
    let query = `DELETE FROM profile WHERE id = '${id}'`

    db.run(query, ()=>{
      res.redirect('/profiles')
    })
  })

})


// LOCALHOST CONNECTION
app.listen(3000, function() {
  console.log('Sedang Berjalan .....!!!!!');
})
