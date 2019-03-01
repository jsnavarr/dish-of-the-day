## dish-of-the-day
**dish-of-the-day** is the airb&b of home made food. People can publish in advance the dishes they are cooking and customers can order them using the app. Customers will rate the dishes based on their experience.

## user Stories
**dish-of-the-day** will start with a login screen where users(customers) will join using their google account. Once customer is logged in can place their order for specific dish and time to pick it up. Customer can rate their experience no before than 1 day after their pick up date. Dishes can be ordered by price and time availability.
Sellers will publish their dishes (picture, description, price and a window of time availability).

As a customer/Cooker I want to login in order to publish dishes (cooker), place an order (customer), post a comment and rate a dish(customer)
Place order: as a customer, I want to be able to place an order which will specify the dish, quantity, pick up time and total cost.

Publish dish: as a cooker, I want to be able to publish a dish with a picture, price, description, pick-up availability and type (asian, Mexican, vegetarian, etc.)

Browse dishes: as a customer/cooker I want to be able to browse all dishes.

## Design

###MVP
### Model
There are 3 main models:

    - Dishes: information about a dish with a relation of 1:N with orders
    	- Comments are embedded in dishes with a rating an a timestamp.
    - Orders: information of the orders placed with a relation N:1 to dishes and 1:N to users
    - Users: information about users with a relation of 1:N to dishes and 1:N to orders


There are 3 main viewers, each one with CRUD functionality (add, edit, delete, show).
	- Dishes
	- Orders
	- Users

There are 3 main controllers each one implementing CRUD functionality (add, edit, delete, show) and two fo them with a subcontroller for API support
	- Dishes
	- Orders

	

![Welcome](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishofthedaywelcome2.png)

![Bilby Stampede](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishofthedaywelcome2.png)