const Catalog = require('../models/Catalog');
const { multipleMongooseObject } = require('../../utils');

class siteController {
  about(req, res, next) {
    Catalog.find({})
      .then((listCategory) => {
        res.render('about', {
          listCategory: multipleMongooseObject(listCategory),
        });
      })
      .catch(next);
  }
  contact(req, res, next) {
    Catalog.find({})
      .then((listCategory) => {
        res.render('contact', {
          listCategory: multipleMongooseObject(listCategory),
        });
      })
      .catch(next);
  }
  cart(req, res, next) {
    res.render('cart');
  }
}

module.exports = new siteController();
