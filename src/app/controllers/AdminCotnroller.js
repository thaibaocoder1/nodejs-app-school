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
  productAdd(req, res, next) {
    req.body.thumb = {
      data: req.file.originalname,
      contentType: req.file.mimetype,
      fileName: req.file.originalname,
    };
    try {
      Product.create(req.body)
        .then(() => {
          res.redirect('/admin/products');
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
  async productUpdate(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!req.file) {
        if (JSON.stringify(req.body) !== JSON.stringify(product.toObject())) {
          await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
          res.redirect('/admin/products');
        } else {
          res.redirect('/admin/products');
        }
      } else {
        req.body.thumb = {
          data: req.file.originalname,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        };
        await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.redirect('/admin/products');
      }
    } catch (error) {
      res.status(500).send('Lỗi khi xử lý request.');
    }
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
        return res.send(201).json({
          status: 'success',
          message: 'Update successfully',
        });
      })
      .catch(next);
  }
  categoryAdd(req, res, next) {
    res.render('category/add');
  }
  categoryStore(req, res, next) {
    Catalog.create(req.body)
      .then(() => {
        return res.send(201).json({
          status: 'success',
          message: 'Created successfully',
        });
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
