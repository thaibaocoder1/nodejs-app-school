const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const { multipleMongooseObject, mongooseObject } = require('../../utils');

class ProductController {
  // [GET] /products
  index(req, res, next) {
    Promise.all([Catalog.find({}), Product.find({})])
      .then(([listCategory, listProduct]) => {
        listCategory = multipleMongooseObject(listCategory);
        listProduct = multipleMongooseObject(listProduct);
        res.render('products', {
          listCategory,
          listProduct,
        });
      })
      .catch(next);
  }
  // [GET] /products/details/:id
  detail(req, res, next) {
    Promise.all([Catalog.find({}), Product.findById({ _id: req.params.id })])
      .then(([listCategory, product]) => {
        const categoryId = product.category_id;
        return Promise.all([
          Product.find({ category_id: categoryId }),
          listCategory,
          product,
        ]);
      })
      .then(([relatedProduct, listCategory, product]) => {
        let filterRelatedProduct = [...relatedProduct].filter(
          (item) => item._id.toString() !== req.params.id,
        );
        listCategory = multipleMongooseObject(listCategory);
        filterRelatedProduct = multipleMongooseObject(filterRelatedProduct);
        product = mongooseObject(product);
        res.render('details', {
          listCategory,
          product,
          filterRelatedProduct,
        });
      })
      .catch(next);
  }
  // [GET] /products/:slug
  page(req, res, next) {
    res.send('hi');
  }
}
module.exports = new ProductController();
