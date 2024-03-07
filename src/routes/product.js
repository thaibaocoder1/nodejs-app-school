const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/details/:id', productController.detail);
router.get('/:slug', productController.page);
router.get('/', productController.index);

module.exports = router;
