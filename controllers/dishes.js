var Dish = require('../models/dish');
var Order = require('../models/order');
var moment = require('moment');

var message = "";

function getDateArray(object, key){
    var a = [];
    if(object){
        object.forEach(function(o){
            console.log(o[key]);
            a.push((moment(o[key]).format("YYYY-MMMM-DD")+" @"+moment(o[key]).format("HH:mm")).toString());
        })
    }
    // var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");;
    // var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss");;

    return a;
}

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

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

function index(req, res) {
    message="";
    Dish.find({}).sort({price: 1}).exec(function(err, dishes){
        // console.log(dishes);
        var av_date_s = getDateArray(dishes, 'availability_start');
        var av_date_e = getDateArray(dishes, 'availability_end');
        // console.log('user role: '+ req.user+' '+ typeof(req.user));
        // console.log('user id: '+ req.user._id+' dish.cooker_id'+ dish.cooker_id);
        //find the user logged-in so it is passed to the page being rendered
        res.render('dishes/index', { dishes, av_date_s, av_date_e, message, user: req.user});
    });
}

function deleteDish(req, res, next) {
    console.log('trying to delete a dish');
    message="";
    Dish.findById(req.params.id, function(err, dish) {
        var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");;
        var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss");;
        res.render('dishes/delete', { title: 'delete dish', dish, av_date_s, av_date_e, user: req.user, message});
    });
}

function removeDish(req, res, next) {
    message="";
    console.log('trying to remove dish');
    Dish.findById(req.params.id, function(err, dish) {
        dish.delete(function(err, dish){
            if(err){
                console.log('error deleting dish');
                message='error deleting dish';
            } else {
                Dish.find({}).sort({name: 1}).exec(function(err, dishes){
                    console.log(dishes);
                    if(err){
                        console.log('error finding all dishes')
                    } else {
                        message="dish deleted";
                        res.redirect('/dishes');
                    }
                });
            }
        });
    });
}

function show(req, res) {
    message="";
    Dish.findById(req.params.id, function(err, dish) {
        console.log(dish);
        if(err){
            console.log('error trying to find dish');
        } else {
        var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");;
        var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss");;

        // calculate the rating
        var rating = null;
        console.log('length '+dish.comments.length);
        if(dish.comments.lenght>0){
            console.log('calculating rating');
            var sum = 0;
            var count = 0;
            dish.comments.forEach(function(d){
                sum+=dish.comments.rating;
                count++;
            });
            var rating = parseInt(Math.floor(sum/count));
            console.log('rating '+rating);
        }
        console.log('req.user.email: '+req.user.email+ 'dish.cooker_id: '+ dish.user_id);
        res.render('dishes/show', { title: 'dish details', dish, av_date_s, av_date_e, rating, message, user: req.user, message});
        } 
    });
}

function update(req, res, next) {
    message="";
    Dish.findById(req.params.id, function(err, dish) {
        if (err) return res.redirect('/dishes');
        dish.picture = req.body.picture;
        dish.description = req.body.description;
        dish.type = req.body.type;
        dish.price = req.body.price;
        dish.availability_start_date = req.body.availability_start_date;
        dish.availability_start_date = req.body.availability_start_time;
        dish.availability_end_date = req.body.availability_end_date;
        dish.availability_end_time = req.body.availability_end_time;
        dish.totalPortions = req.body.totalPortions;
        // console.log(dish);
        //cooker should not be allowed to update dish.cooker
        dish.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('/dishes');
        // for now, redirect right back to new.ejs
        // message='dish updated';
        // res.render('dishes', {message, user:req.user});
        res.redirect('/dishes/'+dish._id);
    });
  });
}

function editDish(req, res, next) {
    message="";
    console.log('trying to edit dish');
    Dish.findById(req.params.id, function(err, dish) {
        if (err) return res.redirect('/dishes');
        var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD[T]HH:mm:ss");
        var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD[T]HH:mm:ss");
        res.render('dishes/edit', {title: 'edit dish', dish, av_date_s, av_date_e, user: req.user, message});
    });
}

function create(req, res, next) {
    message="";
    var dish = new Dish({
    picture: req.body.picture,
    description : req.body.description,
    type : req.body.type,
    price : req.body.price,
    availability_start : req.body.availability_start,
    availability_end : req.body.availability_end,
    totalPortions : req.body.totalPortions,
    user_id: req.body.user_id});
    console.log(dish);
    console.log(req.body);
    dish.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('/dishes/new');
        // for now, redirect right back to new.ejs
        message="dish created";
        // res.render('dishes', {user:req.user, message});
        res.redirect('/dishes/'+dish._id);
    });
}

function newDish(req, res, next) {
    message="";
    console.log(req.user);
    res.render('dishes/new', {user: req.user, message});
}