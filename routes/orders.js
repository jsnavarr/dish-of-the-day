var express = require('express');
var router = express.Router();
var ordersCtrl = require('../controllers/orders');

router.get('/orders', isLoggedIn, ordersCtrl.index);
router.get('/dishes/:id/orders/new', isLoggedIn, ordersCtrl.new);
router.get('/orders/:id/edit', isLoggedIn, ordersCtrl.edit);
router.get('/orders/:id/delete', isLoggedIn, ordersCtrl.delete);
router.get('/orders/:id', ordersCtrl.show);
router.post('/dishes/:id/orders', isLoggedIn, ordersCtrl.create);
router.post('/orders/:id', isLoggedIn, ordersCtrl.update);
router.delete('/orders/:id', isLoggedIn, ordersCtrl.removeOrder);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
