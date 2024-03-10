const Product = require('../models/Product');
const Catalog = require('../models/Catalog');
const User = require('../models/User');
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const { multipleMongooseObject } = require('../../utils');

class HomeController {
  index(req, res, next) {
    Promise.all([
      Product.find({ categoryID: 1 }),
      Product.find({ categoryID: 2 }),
      Catalog.find({}),
    ])
      .then(([listPhone, listLaptop, listCategory]) => {
        let productPhone = [...listPhone].slice(0, 8);
        let productLaptop = [...listLaptop].slice(0, 8);
        productPhone = multipleMongooseObject(productPhone);
        productLaptop = multipleMongooseObject(productLaptop);
        listCategory = multipleMongooseObject(listCategory);
        res.render('home', {
          productPhone,
          productLaptop,
          listCategory,
        });
      })
      .catch(next);
  }
  account(req, res, next) {
    res.render('account');
  }
  register(req, res, next) {
    res.render('register');
  }
  init(req, res, next) {
    const { email, phone, password, password_confirmation } = req.body;
    if (!email || !phone) {
      return res.status(400).json({
        error: 'Bad Request',
        message: "Missing required information: 'email or phone'",
      });
    }
    if (password !== password_confirmation) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Password is not match with re-password',
      });
    }
    User.create(req.body)
      .then((data) => {
        if (data) {
          res.status(201).json({ status: 'Success', message: 'Created user' });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      })
      .catch(next);
  }
  login(req, res, next) {
    res.render('login');
  }
  check(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: "Missing required information: 'email or password'",
      });
    }
    User.findOne({
      email,
      password,
    })
      .then((data) => {
        if (data) {
          const token = jwt.sign({ _id: data._id }, 'password');
          return res.status(200).json({
            success: true,
            token,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Not found apply user',
          });
        }
      })
      .catch(next);
  }
  // admin(req, res, next) {
  //   try {
  //     const verify = jwt.verify(req.cookies.token, 'password');
  //     if (verify) {
  //       res.render('home');
  //     }
  //   } catch (error) {
  //     res.redirect('/login');
  //   }
  // }
  admin(req, res, next) {
    res.render('home');
  }
}
module.exports = new HomeController();
