const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const adminController = require('../app/controllers/AdminCotnroller');

// Product
router.get('/products', adminController.products);
router.get('/products/edit/:id', adminController.productEdit);
router.post(
  '/products/store',
  upload.single('thumb'),
  adminController.productAdd,
);
router.patch(
  '/products/update/:id',
  upload.single('thumb'),
  adminController.productUpdate,
);
router.get('/products/add', adminController.productCreate);
// Category
router.get('/category', adminController.category);
router.get('/category/edit/:id', adminController.categoryEdit);
router.put('/category/update/:id', adminController.categoryUpdate);
router.get('/category/add', adminController.categoryAdd);
router.post('/category/store', adminController.categoryStore);
router.delete('/category/delete/:id', adminController.categoryDelete);
// Account
router.get('/account/info', adminController.account);
// User
router.get('/user/edit/:id', adminController.userEdit);
router.get('/user', adminController.user);
// Home admin
router.get('/', adminController.index);

module.exports = router;
