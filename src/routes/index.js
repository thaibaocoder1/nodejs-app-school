const homeRouter = require('./home');
const adminRouter = require('./admin');
const productRouter = require('./product');
const accountRouter = require('./account');
const siteRouter = require('./site');

function routes(app) {
  app.use('/products', productRouter);
  app.use('/account', accountRouter);
  app.use('/site', siteRouter);
  app.use('/admin', adminRouter);
  app.use('/', homeRouter);
}
module.exports = routes;
