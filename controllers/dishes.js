var Dish = require('../models/dish');

module.exports = {
    new: newDish, //render the new dish view
    create, //save the data from the view to the database
    edit: editDish,
    update,
    delete: deleteDish,
    removeDish,
    index, //there are 2 views: customer (all dishes), cooker (his dishes)
    show //one specific dish
}

function index(req, res) {
    Dish.find({}).sort({price: 1}).exec(function(err, dishes){
        console.log(dishes);
        res.render('dishes/index', { dishes });
    });
}

function deleteDish(req, res) {
    console.log('trying to delete a dish');
    Dish.findById(req.params.id, function(err, dish) {
      res.render('dishes/delete', { title: 'delete dish', dish});
    });
}

function removeDish(req, res) {
    console.log('trying to remove dish');
    Dish.findById(req.params.id, function(err, dish) {
        dish.delete(function(err, dish){
            if(err){
                console.log('error deleting dish')
            } else {
                Dish.find({}).sort({name: 1}).exec(function(err, dishes){
                    console.log(dishes);
                    if(err){
                        console.log('error finding all dishes')
                    } else {    
                        res.redirect('/dishes'/*, { title: 'all dishes', dishes}*/);
                    }
                });
            }
        });
    });
}

function show(req, res) {
    Dish.findById(req.params.id, function(err, dish) {
        console.log(dish);
        if(err){
            console.log('error trying to find dish');
        } else {
        console.log(dish);
        res.render('dishes/show', { title: 'dish details', dish});
        } 
    });
}

function update(req, res) {
    Dish.findById(req.params.id, function(err, dish) {
        if (err) return res.render('dishes');
        dish.picture = req.body.picture;
        dish.description = req.body.description;
        dish.type = req.body.type;
        dish.price = req.body.price;
        dish.availability_start_date = req.body.availability_start_date;
        dish.availability_start_date = req.body.availability_start_time;
        dish.availability_end_date = req.body.availability_end_date;
        dish.availability_end_time = req.body.availability_end_time;
        dish.totalPortions = req.body.totalPortions;
        console.log(dish);
        //cooker should not be allowed to update dish.cooker
        dish.save(function(err) {
        // one way to handle errors
        if (err) return res.render('dishes');
        // for now, redirect right back to new.ejs
        res.redirect('/dishes');
    });
  });
}

function editDish(req, res) {
    console.log('trying to edit dish');
    Dish.findById(req.params.id, function(err, dish) {
        if (err) return res.render('dishes');
        console.log(dish.availability_start.toLocaleString());
        console.log(new Date(dish.availability_start));
        res.render('dishes/edit', {title: 'edit dish', dish});
    });
}

function create(req, res) {
    var dish = new Dish({
    picture: req.body.picture,
    description : req.body.description,
    type : req.body.type,
    price : req.body.price,
    availability_start_date : req.body.availability_start_date,
    availability_start_time : req.body.availability_start_time,
    availability_end_date : req.body.availability_end_date,
    availability_end_time : req.body.availability_end_time,
    totalPortions : req.body.totalPortions});
    console.log(dish);
    console.log(req.body);
    dish.save(function(err) {
        // one way to handle errors
        if (err) return res.render('dishes/new');
        // for now, redirect right back to new.ejs
        res.redirect('/dishes');
    });
}

function newDish(req, res) {
    res.render('dishes/new');
}