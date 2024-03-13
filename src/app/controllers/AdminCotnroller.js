const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const { multipleMongooseObject, mongooseObject } = require('../../utils');
class AdminController {
  index(req, res, next) {
    res.render('home');
  }
  // Product
  products(req, res, next) {
    Promise.all([Product.find({}), Product.countDocuments()])
      .then(([products, counted]) => {
        res.render('product/view', {
          products: multipleMongooseObject(products),
          counted,
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
  // Category
  category(req, res, next) {
    Promise.all([Catalog.find(), Catalog.countDocuments()]).then(
      ([listCategory, counted]) => {
        res.render('category/view', {
          listCategory: multipleMongooseObject(listCategory),
          counted,
        });
      },
    );
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
  categoryDelete(req, res, next) {
    Catalog.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect('/admin/category');
      })
      .catch(next);
  }
}
module.exports = new AdminController();
