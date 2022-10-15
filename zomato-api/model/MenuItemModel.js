// import mongoose schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// create schema
const MenuItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: ObjectId,
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

// create model (collection)
const MenuItemModel = mongoose.model("menuitem", MenuItemSchema, "menuitems");

// export model
module.exports = MenuItemModel;
