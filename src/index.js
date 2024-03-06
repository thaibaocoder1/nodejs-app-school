const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const path = require('path');
const routes = require('./routes');
const db = require('./config/db');
const { formatCurrencyNumber } = require('./utils');
const port = process.env.PORT || 3000;

// Connect database
db.connect();
// Middleware
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
// Static folder
app.use(express.static(path.join(__dirname, 'public')));
// Template engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      calcPrice(original, sale) {
        const price = (original * (100 - Number.parseInt(sale))) / 100;
        return formatCurrencyNumber(price);
      },
      format(number) {
        return formatCurrencyNumber(number);
      },
    },
  }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// Routes
routes(app);
// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
