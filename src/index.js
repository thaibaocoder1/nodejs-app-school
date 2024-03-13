const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const { formatCurrencyNumber } = require('./utils');
const db = require('./config/db');
const authMethod = require('./auth/AuthController');
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
app.use(methodOverride('_method'));
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
      selectedVal(categoryPID, catgoryID) {
        return catgoryID === categoryPID ? 'selected' : '';
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
const checkAuthMiddleware = (req, res, next) => {
  const authorizationToken = req.cookies.accessToken;
  const authorizationTokenRefresh = req.cookies.refreshToken;
  if (authorizationToken && authorizationTokenRefresh) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(authorizationToken, accessTokenSecret, async (err, data) => {
      if (err) {
        return res.redirect('/login');
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const expirationTimestamp = data.exp;
        if (expirationTimestamp - currentTimestamp < 120) {
          const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
          const dataForAccessToken = {
            email: data.payload.email,
          };
          const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
          );
          res.cookie('accessToken', accessToken, { maxAge: 5 * 60 * 1000 });
        }
        req.user = {
          email: data.payload.email,
        };
        next();
      }
    });
  } else {
    console.log('No access token found');
    next();
  }
};
app.use(checkAuthMiddleware);
// Routes;
routes(app);
// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
