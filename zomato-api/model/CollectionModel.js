// import mongoose schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const CollectionSchema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  collection_type: { type: Number },
});

// create model (collection)
const CollectionModel = mongoose.model(
  "collection",
  CollectionSchema,
  "collections"
);

// export model
module.exports = CollectionModel;
