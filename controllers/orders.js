var Order = require('../models/order');
var Dish = require('../models/dish');
var moment = require('moment');

module.exports = {
    new: newOrder, //render the new order view
    create, //save the data from the view to the database
    edit: editOrder,
    update,
    delete: deleteOrder,
    removeOrder,
    index, //there are 2 views: customer (all orders), cooker (his orders)
    show //one specific order
}

function getDateArray(object, key){
    var a = [];
    if(object){
        object.forEach(function(o){
            a.push(moment(o[key]).format("YYYY-MMMM-DD")+" @"+moment(o[key]).format("HH:mm"));
        })
    }
    console.log(a);
    return a;
}

// function getDishesFromOrders(orders){
//     var dishes = [{}];
//     var i=0;
//     orders.forEach(function(order){
//         console.log('dish id '+ order['dish_id']);
//         Dish.findById(order['dish_id'], function(err, dish) {
//             console.log("dish "+dish);
//             if(err){
//                 console.log('error trying to find a dish');
//             } else {
//                 console.log('dish to pop'+ dish['picture']);
//                 dishes.pop({picture: dish['picture'], desciption: dish['description'], type: dish['type'], price: dish['price']});         
//                 console.log('dishes '+ i + dishes[i]);
//                 i++;
//             }
//         });      
//     });
//     console.log('dishes returned '+dishes);
//     return dishes;
// }

// function getOrders() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             Order.find({}).sort({pickup_time: 1}).exec(function(err, orders){
//                 if(err){
//                     resolve(null)
//                 } else {
//                     resolve(orders);
//                 }
//             });
//         }, 2000);
//     });
// }

// function getDishes(orders) {
//     var dishes = [];
//     return new Promise(resolve => {
//         setTimeout(() => {
//             orders.forEach(function(order){
//                 Dish.findById(order['dish_id'], function(err, dish) {
//                     // if(err){
//                     //     resolve(null);
//                     // } else {
//                         dishes.push(dish);
//                         console.log('dish '+ dishes);
//                     // }
//                 });      
//             });
//             resolve(dishes);
//         }, 4000);
//     });
// }

// async function getOrdersAndDishes(){
//     var orders = await getOrders();
//     console.log('orders '+orders);
//     var dishes = await getDishes(orders);
//     console.log('dishes '+dishes);
//     return [orders, dishes];
// }

// function index(req, res) {
//     var result = getOrdersAndDishes();
//     var orders = result[0];
//     var dishes = result[1];
//     var pickup_times = getDateArray(orders, 'pickup_time');
//     res.render('orders/index', { orders, pickup_times});    
// }

function index(req, res, next) {
    Order.find({}).sort({pickup_time: 1}).exec(function(err, orders){
        if(err){
            console.log('error trying to get orders')
        } else {
            console.log(orders);
            var pickup_times = getDateArray(orders, 'pickup_time');
            // var dishes = getDishesFromOrders(orders);
            // console.log('dishes xxx '+dishes);
            res.render('orders/index', { orders, pickup_times, user: req.user});
        }
    });
}

function deleteOrder(req, res, next) {
    console.log('trying to delete a order');
    Order.findById(req.params.id, function(err, order) {
        Dish.findById(order.dish_id, function(err, dish) {
            if(err){
                console.log('error trying to find a dish');
            } else {
                var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");
                var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss"); 
                var pickup_time = moment(order.pickup_time).format("YYYY-MM-DD")+" @"+moment(order.pickup_time).format("HH:mm:ss");
                res.render('orders/delete', { title: 'delete order', order, pickup_time, dish, av_date_s, av_date_e, user: req.user});
            }
        });      
    });
}

function removeOrder(req, res, next) {
    console.log('removing order');
    Order.findById(req.params.id, function(err, order) {
        order.delete(function(err, order){
            if(err){
                console.log('error deleting order')
            } else {
                Order.find({}).sort({pickup_time: 1}).exec(function(err, orders){
                    console.log(orders);
                    if(err){
                        console.log('error finding all orders')
                    } else {    
                        res.redirect('/orders'/*, { title: 'all orders', orders}*/);
                    }
                });
            }
        });
    });
}

function show(req, res, next) {
    Order.findById(req.params.id, function(err, order) {
        console.log(order);
        if(err){
            console.log('error trying to find order');
        } else {
            console.log(order);
            Dish.findById(order.dish_id, function(err, dish) {
                if(err){
                    console.log('error trying to find a dish');
                } else {
                    var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");
                    var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss"); 
                    var pickup_time = moment(order.pickup_time).format("YYYY-MM-DD")+" @"+moment(order.pickup_time).format("HH:mm:ss");
                    res.render('orders/show', { title: 'order details', order, pickup_time, dish, av_date_s, av_date_e, user: req.user});
                }
            });
        } 
    });
}

function update(req, res, next) {
    Order.findById(req.params.id, function(err, order) {
        if (err) return res.render('orders');
        order.quantity = req.body.quantity,
        order.pickup_time = req.body.pickup_time,
        order.allergies = req.body.allergies,
        console.log(order);
        //cooker should not be allowed to update order.cooker
        order.save(function(err) {
        // one way to handle errors
        if (err) return res.render('orders');
        // for now, redirect right back to new.ejs
        res.redirect('/orders');
    });
  });
}

function editOrder(req, res, next) {
    console.log('trying to edit order');
    Order.findById(req.params.id, function(err, order) {
        if (err) return res.render('orders');
        var pickup_time = moment(order.pickup_time).format("YYYY-MM-DD[T]HH:mm:ss");
        console.log(pickup_time);
        console.log(order);
        //get the dish related to this order so the information is displayed
        Dish.findById(order.dish_id, function(err, dish) {
            if(err){
                console.log('error trying to find a dish');
            } else {
                var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");;
                var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss");;    
                res.render('orders/edit', {title: 'edit order', order, pickup_time, dish, av_date_s, av_date_e,user: req.user});
            }
        });
    });
}

function create(req, res, next) {
    var order = new Order({
    quantity: req.body.quantity,
    pickup_time : req.body.pickup_time,
    allergies : req.body.allergies,
    dish_id: req.params.id
    });
    console.log(order);
    console.log(req.body);
    order.save(function(err) {
        // one way to handle errors
        if (err) return res.render('orders/new');
        // for now, redirect right back to new.ejs
        res.redirect('/orders');
    });
}

function newOrder(req, res, next) {
    console.log(req.params.id);
    Dish.findById(req.params.id, function(err, dish) {
        if(err){
            console.log('error placing an order');
        } else {
            var av_date_s = moment(dish.availability_start).format("YYYY-MM-DD")+" @"+ moment(dish.availability_start).format("HH:mm:ss");;
            var av_date_e = moment(dish.availability_end).format("YYYY-MM-DD")+ " @"+moment(dish.availability_end).format("HH:mm:ss");;    
            res.render('orders/new', {dish_id: req.params.id, dish, av_date_s, av_date_e, user: req.user});
        }
    });
}