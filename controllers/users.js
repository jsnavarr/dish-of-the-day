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
      console.log(req.user);
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
            res.redirect('/users');
          } else {    
            res.redirect('/users');
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
      console.log('req.user.email ' +req.user.email + ' user.email '+user.email);
      res.render('users/show', { title: 'user details', user, message, uemail: req.user.email});
    } 
  });
}

function update(req, res, next) {
  message="";
  // console.log('req.body.role '+req.body.role);
  User.findById(req.params.id, function(err, user) {
    if(err) {
      console.log(err);
      return res.redirect('/users');
    }
    user.role = req.body.role;
    user.street = req.body.street;
    user.number = req.body.number;
    user.zip = req.body.zip;
    user.state = req.body.state;
    user.city = req.body.city;
    console.log(req.body);
    user.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/users/'+user._id);
    res.redirect('/users/'+user._id);
    });
  });
}

function editUser(req, res, next) {
  message="";
  console.log('trying to edit user');
  User.findById(req.params.id, function(err, user) {
    if (err) return res.redirect('/users');
    res.render('users/edit', {title: 'edit user', user, message});
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
      if (err) return res.redirect('/users');
      // for now, redirect right back to new.ejs
      res.redirect('/users/'+user._id);
    });
  }

function newUser(req, res, next) {
  message="";
  //get the user login information (name, email) and update form with that information
  var name = req.user.name;
  var email = req.user.email;

  res.render('users/new', {user: req.user, message, name, email});
}