const express = require('express')
const bodyParser = require('body-parser')
// const router  = require('./routers/index.js')

const app = express()
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


//
// const subject = require('./routers/subjects')
// app.use('/subjects', subject);

const index = require('./routers/index.js')
app.use('/', index)


const contacts = require('./routers/contacts.js')
app.use('/', contacts)


const groups = require('./routers/groups.js')
app.use('/', groups)



app.listen(3000)
