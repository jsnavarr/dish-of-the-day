var express = require('express');
var router = express.Router();
var apiDishesCtrl = require('../../controllers/api/dishes');

router.get('/', apiDishesCtrl.getAllDishes);
router.get('/:id', apiDishesCtrl.getOneDish)
router.post('/', apiDishesCtrl.createDish);
router.delete('/:id', apiDishesCtrl.deleteDish)
router.put('/:id', apiDishesCtrl.updateDish)


module.exports = router;
