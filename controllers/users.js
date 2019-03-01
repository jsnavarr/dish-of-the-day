var User = require('../models/user');
var message="";

module.exports = {
    new: newUser, //render the new user view
    create, //save the data from the view to the database
    edit: editUser,
    update,
    delete: deleteUser,
    removeUser,
    index, //only the admin can see all users
    show //one specific user
}

//only the admin can see all users
function index(req, res, next) {
    message="";
    User.find({}).sort({name: 1}).exec(function(err, users){
      // console.log(users);
      res.render('users/index', {
        users,
        user: req.user,
        name: req.query.name,
        message
        // sortKey
      });
    });
}

function deleteUser(req, res, next) {
  message="";
  User.findById(req.params.id, function(err, user) {
    res.render('users/delete', { title: 'delete user', user, message});
    });
}

function removeUser(req, res, next) {
  message="";
  console.log('trying to remove user');
  User.findById(req.params.id, function(err, user) {
    user.delete(function(err, user){
      if(err){
        console.log('error deleting user');
        message = "error deleting user";
      } else {
        User.find({}).sort({name: 1}).exec(function(err, users){
          console.log(users);
          if(err){
            console.log('error finding all users');
            message = "error deleting user";
          } else {    
            res.redirect('/users', {message});
          }
        });
      }
    });
  });
}

function show(req, res, next) {
  message="";
  User.findById(req.params.id, function(err, user) {
    if(err){
      console.log('error trying to find user');
      message = "error trying to find user";
    } else {
      // console.log(user);
      res.render('users/show', { title: 'user details', user, message});
    } 
  });
}

function update(req, res, next) {
  message="";
  User.findById(req.params.id, function(err, user) {
  user.role = req.body.role;
  user.name = req.body.name;
  user.email = req.body.email;
  user.street = req.body.street;
  user.number = req.body.number;
  user.zip = req.body.zip;
  user.state = req.body.state;
  user.city = req.body.city;
  user.save(function(err) {
    // one way to handle errors
    if (err) return res.render('users', {message: 'error updating user'});
    // for now, redirect right back to new.ejs
    res.redirect('/users', {message});
    });
  });
}

function editUser(req, res, next) {
  message="";
  console.log('trying to edit user');
  User.findById(req.params.id, function(err, user) {
    if (err) return res.render('users', {message: 'error updating user'});
    res.render('users/edit', {title: 'edit user', user});
  });
}

function create(req, res, next) {
  message="";
  var user = new User({
    role: req.body.role,
    name: req.body.name,
    email: req.body.email,
    street: req.body.street,
    number: req.body.number,
    zip: req.body.zip,
    state: req.body.state,
    city: req.body.city,
    country: 'USA'  
  });
    console.log(user);
    console.log(req.body);
    user.save(function(err) {
      // one way to handle errors
      if (err) return res.render('users/new', {message: 'error creating user'});
      // for now, redirect right back to new.ejs
      res.redirect('/users', {message});
    });
  }

function newUser(req, res, next) {
  message="";
  res.render('users/new', {user: req.user, message});
}