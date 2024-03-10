const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const { multipleMongooseObject } = require('../../utils');

class AdminController {
  index(req, res, next) {
    res.render('home');
  }
  products(req, res, next) {
    Product.find({}).then((products) => {
      res.render('products', {
        products: multipleMongooseObject(products),
      });
    });
  }
}
module.exports = new AdminController();
