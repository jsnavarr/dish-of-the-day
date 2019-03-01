var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', isLoggedIn, usersCtrl.index);
router.get('/new', isLoggedIn, usersCtrl.new);
router.get('/:id/edit', isLoggedIn, usersCtrl.edit);
router.get('/:id/delete', isLoggedIn, usersCtrl.delete);
router.get('/:id', isLoggedIn, usersCtrl.show);
router.post('/', isLoggedIn, usersCtrl.create);
router.post('/:id', isLoggedIn, usersCtrl.update);
router.delete('/:id', isLoggedIn, usersCtrl.removeUser);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
