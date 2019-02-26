var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/new', usersCtrl.new);
router.get('/:id/edit', usersCtrl.edit);
router.get('/:id/delete', usersCtrl.delete);
router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);
router.post('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.removeUser);

module.exports = router;
