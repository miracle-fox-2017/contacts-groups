const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const contacts = require('./routers/contacts')
const groups = require('./routers/groups')
const profiles = require('./routers/profiles')
const addresses = require('./routers/addresses');

const app = express()
const db = new sqlite3.Database('database.db')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/contacts', contacts)
app.use('/groups', groups)
app.use('/profiles', profiles)
app.use('/addresses', addresses)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/lastcontact', (req, res) => {
  db.all(`SELECT * FROM ContactsGroups`, (err, contact) => {
    res.send(contact)
  })
})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
