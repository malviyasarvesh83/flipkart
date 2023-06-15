const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchase-controller');

router.get('/placeOrder', purchaseController.placeOrder);

module.exports = router;