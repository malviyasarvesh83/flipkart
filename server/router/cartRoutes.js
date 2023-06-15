const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart-controller');
const Authorization = require('../middleware/auth');

router.get('/getCartDetails', Authorization.authenticate, cartController.getCart);
router.post('/addToCart', Authorization.authenticate, cartController.addToCart);
router.delete('/deleteFromCart/:id', Authorization.authenticate, cartController.deleteFromCart);
router.post('/updateAddress', Authorization.authenticate, cartController.updateAddress);
module.exports = router;