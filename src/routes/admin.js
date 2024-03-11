const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminCotnroller');

// Product
router.get('/products', adminController.products);
router.get('/products/edit/:id', adminController.productEdit);
router.get('/products/add', adminController.productCreate);
// Category
router.get('/category', adminController.category);
router.get('/category/edit/:id', adminController.categoryEdit);
router.put('/category/update/:id', adminController.categoryUpdate);
router.get('/category/add', adminController.categoryAdd);
router.post('/category/store', adminController.categoryStore);
// Home admin
router.get('/', adminController.index);

module.exports = router;
