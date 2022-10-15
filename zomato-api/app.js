require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./router/api-router");
const app = express();

app.use(cors()); // enable cors

app.use(express.json()); //post request enable
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

console.log("connecting to db...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log("connected !!!");
      console.log(
        `zomato api is running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
