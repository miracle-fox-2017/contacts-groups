const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const contactsRouter = require('./routers/contacts')
app.use('/contacts', contactsRouter)
const groupsRouter = require('./routers/groups')
app.use('/groups', groupsRouter)
const addressesRouter = require('./routers/addresses')
app.use('/addresses', addressesRouter)
const profileRouter = require('./routers/profile')
app.use('/profiles', profileRouter)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
