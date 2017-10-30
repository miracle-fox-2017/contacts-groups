const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Router
const indexRouter = require('./routers/index-routes');
const contactRouter = require('./routers/contact-routes');
const groupRouter = require('./routers/group-routes');
const profileRouter = require('./routers/profile-routes');
const addressRouter = require('./routers/address-routes');
const addressContactRouter = require('./routers/address-contact-routes');

// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup view
app.set('views', './views');
app.set('view engine', 'ejs');

// Website route
app.use('/', indexRouter);
app.use('/contacts', contactRouter);
app.use('/groups', groupRouter);
app.use('/profiles', profileRouter);
app.use('/addresses', addressRouter);
app.use('/addresses_with_contact', addressContactRouter);


// Listening
app.listen(3001, () => {
	console.log('Listening port 3001');
});