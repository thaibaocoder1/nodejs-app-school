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
const dayjs = require('dayjs');
const User = require('./app/models/User');
const dotenv = require('dotenv');
dotenv.config();
// Connect database
db.connect();
// Start app
const app = express();
// Environment variables
const port = process.env.PORT || 3000;
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
        const price = (original * (100 - sale)) / 100;
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
      formatDate(date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm');
      },
      checkStatus(status, quantity) {
        switch (true) {
          case quantity === 0 && status === 0:
            return 'Ngưng bán';
          case quantity === 0 && status === 1:
            return 'Đợi nhập hàng';
          case quantity <= 20 && status === 1:
            return 'Sắp hết hàng';
          case quantity > 0 && status === 0:
            return 'Ngưng bán';
          default:
            return 'Còn hàng';
        }
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
  if (authorizationTokenRefresh) {
    if (authorizationToken) {
      next();
    } else {
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      jwt.verify(
        authorizationTokenRefresh,
        refreshTokenSecret,
        async (err, data) => {
          if (err) {
            return res.redirect('/login');
          } else {
            const email = data.payload.email;
            const dataForAccessToken = {
              email,
            };
            const accessToken = await authMethod.generateToken(
              dataForAccessToken,
              accessTokenSecret,
              accessTokenLife,
            );
            let refreshToken = await authMethod.generateToken(
              dataForAccessToken,
              refreshTokenSecret,
              process.env.REFRESH_TOKEN_LIFE,
            );
            await User.findOneAndUpdate(
              { email },
              { refreshToken: refreshToken },
            );
            res.cookie('accessToken', accessToken, { maxAge: 5 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken);
            req.user = {
              email,
            };
            next();
          }
        },
      );
    }
  } else {
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
