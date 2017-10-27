const app = require('express')();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('it works');
  console.log(req.body);
});

app.listen('3000', () => {
  console.log(`App has started`);
});