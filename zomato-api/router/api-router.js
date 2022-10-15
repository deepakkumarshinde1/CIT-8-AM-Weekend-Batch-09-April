const express = require("express");
const router = express.Router();
const collection = require("../controller/CollectionsController");
const location = require("../controller/LocationController");
const restaurant = require("../controller/RestaurantController");
const users = require("../controller/UsersController");
const menuItem = require("../controller/MenuItemController");
const payment = require("../controller/PaymentController");
router.get("/", collection.apiHome);
// meals
router.get("/get-collection-types", collection.getCollectionTypes); // collection
// router.post("/add-meal-type", collection.addMealType); // collection

// location
router.get("/get-location", location.getLocationList);
// router.get("/get-location-by-city", location.getLocationByCity);
// router.post("/add-location", location.addLocationList);

//restaurant
router.get("/get-restaurant", restaurant.getRestaurantList);
// router.post("/add-restaurant", restaurant.addRestaurantList);
router.get("/get-restaurant-by-id/:id", restaurant.getRestaurantDetailsById);
router.get(
  "/get-restaurant-by-location-id",
  restaurant.getRestaurantLocationId
);
router.post("/filter", restaurant.filterRestaurant);

// menu_items
router.get("/get-menu-item/:id", menuItem.getMenuItemsByRestId);

// users
router.post("/sign-up", users.userSignUp);
router.post("/login", users.userLogin);

// payment
router.post("/get-order-id", payment.getOrderId);
router.post("/verify-payment", payment.verifyPayment);
module.exports = router;
