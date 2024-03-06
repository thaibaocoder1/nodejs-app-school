const Product = require("../models/Product");
const Catalog = require("../models/Catalog");
const { multipleMongooseObject, mongooseObject } = require("../../utils");

class ProductController {
  index(req, res, next) {
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
        let filterRelatedProduct = relatedProduct.filter(
          (item) => item._id !== req.params.id
        );
        listCategory = multipleMongooseObject(listCategory);
        filterRelatedProduct = multipleMongooseObject(filterRelatedProduct);
        product = mongooseObject(product);
        res.render("details", {
          listCategory,
          product,
          filterRelatedProduct,
        });
      })
      .catch(next);
  }
}
module.exports = new ProductController();
