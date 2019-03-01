## dish-of-the-day
**dish-of-the-day** is the airb&b of home made food. People can publish in advance the dishes they are cooking and customers can order them using the app. Customers will rate the dishes based on their experience.

![Welcome](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-welcome.png)


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

![Models and ERD](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/Models%20and%20ERD.png)

Note: the cooker schema evolved to user where a user could perform the role of cooker (who will publish dishes) or a consumer (who can place orders).

There are 3 main viewers, each one with CRUD functionality (add, edit, delete, show).
	- Dishes
	- Orders
	- Users

Here is the initial design of some of the views:
![Models and ERD](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/Wireframes.png)

There are 3 main controllers each one implementing CRUD functionality (add, edit, delete, show) and two fo them with a subcontroller for API support
	- Dishes
	- Orders

## Navigating through teh app

This is the welcome screen with a message to the user if he has never logged in telling that only if logged in the full functionality will be enabled or showin hiw name if user is logged in.

![Welcome not logged in](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-welcome.png)

![Welcome logged in](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishofthedaywelcome2.png)

User can browse all dishes, if user is logged in then the "new" button to add a dish and "edit/delete" links will display. 

![All dishes](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-alldishes.png)

When user clicks on "details" then the specific dish will be displayed with a section to add comments/rating.

![Dish details](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-dishdetails.png)

User will see below image after clicking on "edit" link to change dish information related.

![Edit dish](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-editdish.png)

User will be able to delete a dish when logged-in.

![](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-deletedish.png)

To place an order the user only has to click in the "place order" link at the bottom of the specific dish user wants to order. User will enter quantity and pick up time which must be within dish availability timeslot.
![Place order](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-neworder.png)

User can browse orders and go to its details.
![Order details](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-orderdetails.png)

To delete an order just click on the "delete" link at the bottom of the order which will take user to a new page to confirm to delete the order
![Delete order](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-deleteorder.png)

User can update its information when clicking on "edut" at the bottom of the user details.
![Edit user](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-editorder.png)

User information can be deleted from the database
![Delete user](https://github.com/jsnavarr/dish-of-the-day/blob/master/public/images/dishoftheday-deleteuser.png)

## Main challenges (too many to list all here)
	- datetime-local was being added to the database but when trying to set it in HTML when editing a dish availability it was not displayed.
		- The solution was to use moment (a node.js library) which will format the date to "YYYY-MM-DD:HH:MM" which HTML will accept it.
	- When OAUTH was implemented the app crashed but no enough information was displayed in order to understand the root of the issue. I talked to Josh in the class and he told me that I had to pass user information to each controller function.


## If I had more time
	- I would list only up to 5 comments for each dish and have an arrow to show more if clicked.
	- I would display users picture from google account in the top bar.
	- I would enforce users so only cookers can publish dishes.
	- Only user who created a dish/order should be able to edit/delete it.
	- Create a map with dishes locations so user can click on them and get the details.
	- When listing all orders I wanted to show some information of the related dish but had to implement async functions which I could not complete.
	- I would create a new schema "dish of the day" which will have information of the dish availability and price while "dish" schema would still have picture, type, description, price which will not change and cookers will just add "dish of the day".

	