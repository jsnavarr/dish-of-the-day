var express = require('express');
var router = express.Router();
var dishesCtrl = require('../controllers/dishes');

router.get('/', dishesCtrl.index);
router.get('/new', isLoggedIn, dishesCtrl.new);
router.get('/:id/edit', isLoggedIn, dishesCtrl.edit);
router.get('/:id/delete', isLoggedIn, dishesCtrl.delete);
router.get('/:id', dishesCtrl.show);
router.post('/', isLoggedIn, dishesCtrl.create);
router.post('/:id', isLoggedIn, dishesCtrl.update);
router.delete('/:id', isLoggedIn, dishesCtrl.removeDish);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
