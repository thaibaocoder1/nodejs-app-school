const homeRouter = require('./home');
const productRouter = require('./product');

function routes(app) {
  app.use('/products', productRouter);
  app.use('/', homeRouter);
}
module.exports = routes;
