var express = require('express');
var router = express.Router();
var ordersCtrl = require('../../controllers/api/orders');

router.get('/', apiOrdersCtrl.getAllOrders);
router.get('/:id', apiOrdersCtrl.getOneOrder)
router.post('/', apiOrdersCtrl.createOrder);
router.delete('/:id', apiOrdersCtrl.deleteOrder)
router.put('/:id', apiOrdersCtrl.updateOrder)

module.exports = router;
