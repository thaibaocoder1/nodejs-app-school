const Product = require("../models/Product");
const Catalog = require("../models/Catalog");
const { multipleMongooseObject } = require("../../utils");

class HomeController {
  index(req, res, next) {
    Promise.all([
      Product.find({ category_id: 1 }),
      Product.find({ category_id: 2 }),
      Catalog.find({}),
    ])
      .then(([listPhone, listLaptop, listCategory]) => {
        let productPhone = [...listPhone].slice(0, 8);
        let productLaptop = [...listLaptop].slice(0, 8);
        productPhone = multipleMongooseObject(productPhone);
        productLaptop = multipleMongooseObject(productLaptop);
        listCategory = multipleMongooseObject(listCategory);
        res.render("home", {
          productPhone,
          productLaptop,
          listCategory,
        });
      })
      .catch(next);
  }
}
module.exports = new HomeController();
