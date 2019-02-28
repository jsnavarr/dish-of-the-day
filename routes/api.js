var express = require('express');
var router = express.Router();
// var dishesCtrl = require('../controllers/api/dishes');
var apiOrdersCtrl = require('../controllers/api/orders');

router.get('/dishes', dishesCtrl.getAllDishes);
router.get('/dishes/:id', dishesCtrl.getOneDish)
router.post('/dishes', dishesCtrl.createDish);
router.delete('/dishes/:id', dishesCtrl.deleteDish)
router.put('/dishes/:id', dishesCtrl.updateDish)

// router.get('/orders', dishesCtrl.getAllOrders);
// router.get('/orders/:id', dishesCtrl.getOneOrder)
// router.post('/orders', dishesCtrl.createOrder);
// router.delete('/orders/:id', dishesCtrl.deleteOrder)
// router.put('/orders/:id', dishesCtrl.updateOrder)

router.get('/orders', apiOrdersCtrl.getAllOrders);
router.get('/orders/:id', apiOrdersCtrl.getOneOrder)
router.post('/orders', apiOrdersCtrl.createOrder);
router.delete('/orders/:id', apiOrdersCtrl.deleteOrder)
router.put('/orders/:id', apiOrdersCtrl.updateOrder)


module.exports = router;
