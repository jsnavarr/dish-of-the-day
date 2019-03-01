var express = require('express');
var router = express.Router();
var passport = require('passport');

var message = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()){
    message = "all functionality will be enabled once you log in";
  } else {
    message = "Welcome "+req.user.name;
  }
  res.render('index', { title: 'Express', user: req.user, message});
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

 // Google OAuth callback route
 router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/dishes',
    failureRedirect : '/dishes'
  }
));

 // OAuth logout route
 router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/dishes');
});

module.exports = router;
