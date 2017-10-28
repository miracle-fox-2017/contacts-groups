const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routers/index')
const contacts = require('./routers/contacts')
const groups = require('./routers/groups')
const profiles = require('./routers/profiles')
const addresses = require('./routers/addresses')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', index)
app.use('/contacts', contacts)
// app.use('/groups', groups)
// app.use('/profiles', profiles)
// app.use('/addresses', addresses)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
