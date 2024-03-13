const express = require('express');
const router = express.Router();

const accountRouter = require('../app/controllers/AccountController');

router.get('/change', accountRouter.change);
router.get('/logout', accountRouter.logout);
router.get('/', accountRouter.index);

module.exports = router;
