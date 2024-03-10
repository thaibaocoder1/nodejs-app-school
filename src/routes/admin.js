const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminCotnroller');

router.get('/products', adminController.products);
router.get('/', adminController.index);

module.exports = router;
