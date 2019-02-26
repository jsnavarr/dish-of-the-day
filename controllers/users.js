var User = require('../models/user');

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
function index(req, res) {
    User.find({}).sort({name: 1}).exec(function(err, users){
      // console.log(users);
      res.render('users/index', { users });
    });
}

function deleteUser(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/delete', { title: 'delete user', user});
    });
}

function removeUser(req, res) {
  console.log('trying to remove user');
  User.findById(req.params.id, function(err, user) {
    user.delete(function(err, user){
      if(err){
        console.log('error deleting user')
      } else {
        User.find({}).sort({name: 1}).exec(function(err, users){
          console.log(users);
          if(err){
            console.log('error finding all users')
          } else {    
            res.redirect('/users'/*, { title: 'all users', users}*/);
          }
        });
      }
    });
  });
}

function show(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err){
      console.log('error trying to find user');
    } else {
      // console.log(user);
      res.render('users/show', { title: 'user details', user});
    } 
  });
}

function update(req, res) {
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
    if (err) return res.render('users');
    // for now, redirect right back to new.ejs
    res.redirect('/users');
    });
  });
}

function editUser(req, res) {
  console.log('trying to edit user');
  User.findById(req.params.id, function(err, user) {
    if (err) return res.render('users');
    res.render('users/edit', {title: 'edit user', user});
  });
}

function create(req, res) {
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
      if (err) return res.render('users/new');
      // for now, redirect right back to new.ejs
      res.redirect('/users');
    });
  }

function newUser(req, res) {
    res.render('users/new');
}