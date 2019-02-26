var express = require('express');
var router = express.Router();
var dishesCtrl = require('../controllers/dishes');

router.get('/', dishesCtrl.index);
router.get('/new', dishesCtrl.new);
router.get('/:id/edit', dishesCtrl.edit);
router.get('/:id/delete', dishesCtrl.delete);
router.get('/:id', dishesCtrl.show);
router.post('/', dishesCtrl.create);
router.post('/:id', dishesCtrl.update);
router.delete('/:id', dishesCtrl.removeDish);

module.exports = router;
