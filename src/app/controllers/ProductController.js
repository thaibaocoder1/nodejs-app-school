const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const { multipleMongooseObject, mongooseObject } = require('../../utils');

class ProductController {
  // [GET] /products
  index(req, res, next) {
    Promise.all([
      Catalog.find({}),
      Product.find({}),
      Product.countDocuments({}),
    ])
      .then(([listCategory, listProduct, countProducts]) => {
        listCategory = multipleMongooseObject(listCategory);
        listProduct = multipleMongooseObject(listProduct);
        res.render('products', {
          listCategory,
          listProduct,
          countProducts,
        });
      })
      .catch(next);
  }
  // [GET] /products/details/:id
  detail(req, res, next) {
    Promise.all([Catalog.find({}), Product.findById({ _id: req.params.id })])
      .then(([listCategory, product]) => {
        const categoryId = product.categoryID;
        return Promise.all([
          Product.find({ categoryID: categoryId }),
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
    const slug = req.params?.slug;
    Catalog.findOne({ slug: slug })
      .then((data) => {
        if (!data || data === null) {
          return res.status(500).json({ message: 'Invalid slug!!!' });
        } else {
          const catalogID = data.id;
          return Promise.all([
            Product.find({ categoryID: catalogID }),
            data,
            Catalog.find({}),
            Product.countDocuments({ categoryID: catalogID }),
          ]);
        }
      })
      .then(([listProduct, data, listCategory, countProducts]) => {
        listProduct = multipleMongooseObject(listProduct);
        listCategory = multipleMongooseObject(listCategory);
        res.render('products', {
          listProduct,
          listCategory,
          countProducts,
          name: data.title,
        });
      })
      .catch(next);
  }
}
module.exports = new ProductController();
