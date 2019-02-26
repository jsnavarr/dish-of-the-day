var express = require('express');
var router = express.Router();
var dishesOftheDayCtrl = require('../controllers/dishesoftheday');

router.get('/dishes/dishesoftheday', dishesOftheDayCtrl.index);
router.get('/dishes/:id/dishesoftheday/new', dishesOftheDayCtrl.new);
router.get('/dishes/:id/dishesoftheday/:id/edit', dishesOftheDayCtrl.edit);
router.get('/dishes/:id/dishesoftheday/:id/delete', dishesOftheDayCtrl.delete);
router.get('/dishes/:id/dishesoftheday/:id', dishesOftheDayCtrl.show);
router.post('/dishes/:id/dishesoftheday/', dishesOftheDayCtrl.create);
router.post('/dishes/:id/dishesoftheday/:id', dishesOftheDayCtrl.update);
router.delete('/dishes/:id/dishesoftheday/:id', dishesOftheDayCtrl.removeDishOfTheDay);

module.exports = router;
