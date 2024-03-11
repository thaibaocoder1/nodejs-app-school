const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const { multipleMongooseObject, mongooseObject } = require('../../utils');

class AdminController {
  index(req, res, next) {
    res.render('home');
  }
  products(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render('product/view', {
          products: multipleMongooseObject(products),
        });
      })
      .catch(next);
  }
  productEdit(req, res, next) {
    Promise.all([Product.findById({ _id: req.params.id }), Catalog.find()])
      .then(([product, listCategory]) => {
        const catalogPID = mongooseObject(product).categoryID;
        res.render('product/edit', {
          product: mongooseObject(product),
          listCategory: multipleMongooseObject(listCategory),
          catalogPID,
        });
      })
      .catch(next);
  }
  productCreate(req, res, next) {
    Promise.all([Catalog.find()])
      .then(([listCategory]) => {
        res.render('product/create', {
          listCategory: multipleMongooseObject(listCategory),
        });
      })
      .catch(next);
  }
  category(req, res, next) {
    Catalog.find().then((listCategory) => {
      res.render('category/view', {
        listCategory: multipleMongooseObject(listCategory),
      });
    });
  }
  categoryEdit(req, res, next) {
    Promise.all([Catalog.findById({ _id: req.params.id })])
      .then(([category]) => {
        res.render('category/edit', {
          category: mongooseObject(category),
        });
      })
      .catch(next);
  }
  categoryUpdate(req, res, next) {
    Catalog.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect('/admin/category');
      })
      .catch(next);
  }
  categoryAdd(req, res, next) {
    res.render('category/add');
  }
  categoryStore(req, res, next) {
    Catalog.create(req.body)
      .then(() => {
        res.redirect('/admin/category');
      })
      .catch(next);
  }
}
module.exports = new AdminController();
