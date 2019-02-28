var express = require('express');
var router = express.Router();
var dishesCtrl = require('../controllers/api/dishes');
// var ordersCtrl = require('../controllers/api/orders');

router.get('/dishes', dishesCtrl.getAllDishes);
router.get('/dishes/:id', dishesCtrl.getOneDish)
router.post('/dishes', dishesCtrl.createDish);
router.delete('/dishes/:id', dishesCtrl.deleteDish)
router.put('/dishes/:id', dishesCtrl.updateDish)

router.get('/orders', dishesCtrl.getAllOrders);
router.get('/orders/:id', dishesCtrl.getOneOrder)
router.post('/orders', dishesCtrl.createOrder);
router.delete('/orders/:id', dishesCtrl.deleteOrder)
router.put('/orders/:id', dishesCtrl.updateOrder)

// router.get('/orders', ordersCtrl.getAllOrders);
// router.get('/orders/:id', ordersCtrl.getOneOrder)
// router.post('/orders', ordersCtrl.createOrder);
// router.delete('/orders/:id', ordersCtrl.deleteOrder)
// router.put('/orders/:id', ordersCtrl.updateOrder)


module.exports = router;
