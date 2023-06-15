const express = require('express');
const router = express.Router();
const productController = require('../controller/product-controller');
const Authentication = require('../middleware/auth');

router.get('/getTopProducts', Authentication.authenticate, productController.getTopProduct);
router.get('/getMainProducts', Authentication.authenticate, productController.getMainProduct);
router.get('/getProductDetails/:id', productController.getProductDetails);

module.exports = router;