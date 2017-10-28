const express = require('express')
const app = express()

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/contacts', function (req, res) {
    res.render('contacts')
  })

  app.get('/groups', function (req, res) {
    res.render('groups')
  })

  app.get('/profiles', function (req, res) {
    res.render('profiles')
  })

  app.get('/addresses', function (req, res) {
    res.render('addresses')
  })

app.listen(3000, function () {
  console.log('testing berjalan')
})