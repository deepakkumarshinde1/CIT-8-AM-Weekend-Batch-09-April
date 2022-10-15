const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  mobile: { type: Number },
  full_name: { type: String },
});

const UserModel = mongoose.model("user", UserSchema, "users");

module.exports = UserModel;
