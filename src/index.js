const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const { formatCurrencyNumber } = require('./utils');
const db = require('./config/db');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
// Start app
const app = express();
// Environment variables
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
app.use(cookieParser());
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
      defaultVal(value, currentValue) {
        return value || currentValue;
      },
    },
  }),
);
app.set('view engine', '.hbs');
// Using middeware to handle apply view
app.use((req, res, next) => {
  const url = req.url;
  if (url.startsWith('/admin')) {
    app.set('views', path.join(__dirname, 'resources', 'views', 'admin'));
  } else {
    app.set('views', path.join(__dirname, 'resources', 'views', 'client'));
  }
  next();
});
// Routes
routes(app);
// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
