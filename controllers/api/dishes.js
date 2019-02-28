var Dish = require('../../models/dish');

module.exports = {
  getAllDishes,
  getOneDish,
  createDish,
  updateDish,
  deleteDish
};

function getAllDishes(req, res) {
  Dish.find({})
    .then(dishes => {
      res.status(200)
        .json(dishes)
    })
}

function getOneDish(req, res) {
  Dish.findById(req.params.id)
    .then(dish => {
      res.status(200)
        .json(dish)
    })
}

function createDish(req, res) {
  Dish.create(req.body)
    .then(dish => {
      res.status(201)
        .json(dish)
    })
}

function updateDish(req, res) {
  Dish.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(dish => {
      res.status(200)
        .json(dish)
    })
}

function deleteDish(req, res) {
  Dish.findByIdAndRemove(req.params.id)
    .then(dish => {
      res.status(200)
        .json(dish)
    })
}

var Order = require('../../models/order');

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder
};

function getAllOrders(req, res) {
  Order.find({})
    .then(orders => {
      res.status(200)
        .json(orders)
    })
}

function getOneOrder(req, res) {
  Order.findById(req.params.id)
    .then(order => {
      res.status(200)
        .json(order)
    })
}

function createOrder(req, res) {
  Order.create(req.body)
    .then(order => {
      res.status(201)
        .json(order)
    })
}

function updateOrder(req, res) {
  Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(order => {
      res.status(200)
        .json(order)
    })
}

function deleteOrder(req, res) {
  Order.findByIdAndRemove(req.params.id)
    .then(order => {
      res.status(200)
        .json(order)
    })
}