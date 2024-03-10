const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/account', homeController.account);
router.get('/register', homeController.register);
router.post('/register', homeController.init);
router.get('/login', homeController.login);
router.post('/login', homeController.check);
router.get('/', homeController.index);

module.exports = router;
