// var Dish = require('../models/dish');
var DishOfTheDay = require('../models/dishoftheday');
// var User = require('../models/user');
// var Address = require('../models/address');

module.exports = {
    new: newDishOfTheDay, //render the new dish of the day view (cookers only)
    create, //save the data from the view to the database (cookers only)
    edit: editDishOfTheDay,
    update, // (cookers only)
    delete: deleteDishOfTheDay,
    removeDishOfTheDay,    
    index, //all dishes of the day for an specific dish
    show //one specific dish of the day
}

function index(req, res) {
  //show the dishes of the day for specific dish
    DishOfTheDay.find({}).sort({availability_start: 1}).exec(function(err, dishes){
      res.render('dishes/dishoftheday/index', { dishes });
    });
}

function deleteDishOfTheDay(req, res) {
  console.log('trying to delete a dish of the day');
  DishOfTheDay.findById(req.params.id, function(err, dishODD) {
    res.render('dishes/dishesoftheday/delete', { title: 'delete dish of the day', dishODD});
  });
}

function removeDishOfTheDay(req, res) {
  console.log('trying to remove dish of the day');
  DishOfTheDay.findById(req.params.id, function(err, dishODD) {
      dishODD.delete(function(err, dishODD){
          if(err){
              console.log('error deleting dish of the day')
          } else {
              DishOfTheDay.find({}).sort({name: 1}).exec(function(err, dishesODD){
                  console.log(dishesODD);
                  if(err){
                      console.log('error finding all dishes of the day')
                  } else {    
                      res.redirect('/dishes/dishesoftheday'/*, { title: 'all dishes', dishes}*/);
                  }
              });
          }
      });
  });
}

function show(req, res) {
  DishOfTheDay.findById(req.params.id, function(err, dish) {
    res.render('dishes/dishesoftheday/show', { title: 'dish details', dish});
  });
}

function editDishOfTheDay(req, res) {
  console.log('trying to edit dish of the day');
  DishOfTheDay.findById(req.params.id, function(err, dishODD) {
    if (err) return res.render('dishes');
    res.render('dishes/dishesoftheday/edit', {title: 'Edit dish of the Day', dishODD});
  });
}

function update(req, res) {
  DishOfTheDay.findById(req.params.id, function(err, dishODD) {
    dishODD.price = req.body.price;
    dishODD.availability_start = req.body.availability_start;
    dishODD.availability_end = req.body.availability_end;
    dishODD.totalPortions = req.body.totalPortions;

    dishODD.save(function(err) {
    // one way to handle errors
    if (err) return res.render('dishes/dishoftheday/edit');
    // for now, redirect right back to new.ejs
    res.redirect('/dishes/dishesoftheday');
    });
  });
}

function create(req, res) {
    var dishOfTheDay = new DishOfTheDay(req.body);
    dishOfTheDay.save(function(err) {
      // one way to handle errors
      if (err) return res.render('dishes/dishoftheday');
      // for now, redirect right back to new.ejs
      res.redirect('/dishes/dishesoftheday');
    });
  }

function newDishOfTheDay(req, res) {
    res.render('dishes/'+req.params.id+'/dishesoftheday/new');
}