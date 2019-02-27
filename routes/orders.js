var express = require('express');
var router = express.Router();
var ordersCtrl = require('../controllers/orders');

router.get('/orders', ordersCtrl.index);
router.get('/dishes/:id/orders/new', ordersCtrl.new);
router.get('/orders/:id/edit', ordersCtrl.edit);
router.get('/orders/:id/delete', ordersCtrl.delete);
router.get('/orders/:id', ordersCtrl.show);
router.post('/dishes/:id/orders', ordersCtrl.create);
router.post('/orders/:id', ordersCtrl.update);
router.delete('/orders/:id', ordersCtrl.removeOrder);

module.exports = router;
