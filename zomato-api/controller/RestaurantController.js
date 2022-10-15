const RestaurantModel = require("../model/RestaurantModel");
const restaurantList = require("../resources/restaurant.json"); // only to insert
const RestaurantController = {
  getRestaurantList: async function (request, response) {
    try {
      let result = await RestaurantModel.find();
      response.status(200).send({
        status: true,
        restaurant: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addRestaurantList: async function (request, response) {
    try {
      let result = await RestaurantModel.insertMany(restaurantList);
      response.status(200).send({
        status: true,
        message: "added successfully",
        result: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRestaurantDetailsById: async function (request, response) {
    try {
      let { id } = request.params;
      let data = await RestaurantModel.findById(id);
      response.status(200).send({
        status: true,
        result: data,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRestaurantLocationId: async function (request, response) {
    let { lid, rest } = request.query;

    try {
      let data = await RestaurantModel.find(
        {
          name: { $regex: rest + ".*", $options: "i" },
          location_id: Number(lid),
        },
        { name: 1, image: 1, locality: 1, _id: 1, city: 1 }
      );
      response.status(200).send({ status: true, result: data });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  filterRestaurant: async function (request, response) {
    let {
      collection /*mandatory */,
      location,
      cuisine,
      lcost, // 0
      hcost, // 500
      page, //3
      sort, // low to high or high to low
      itemsPerPage, //2
    } = request.body;

    // sort 1 ==>  ASC to DESC (low to high)
    // sort -1 ==> DESC to ASC (high to low)
    page = page === undefined ? 1 : page;
    itemsPerPage = itemsPerPage == !undefined ? itemsPerPage : 2;

    let startIndex = page * itemsPerPage - itemsPerPage; //2-2 = 0
    let endIndex = page * itemsPerPage;

    sort = sort === undefined ? 1 : sort;
    let filter = {};

    if (collection) filter["collection_id"] = Number(collection);
    if (location) filter["location_id"] = location;
    if (cuisine) filter["cuisine_id"] = { $in: cuisine };
    if (lcost !== undefined && hcost !== undefined)
      filter["min_price"] = { $gte: lcost, $lte: hcost };

    console.log(filter);
    try {
      let result = await RestaurantModel.find(filter).sort({
        min_price: sort,
      });
      //[a,b,c,d,e,f]
      // 0,2 ==> 1st page
      // 2,4 ==> 2nd page
      // 4,6 ===> 3rd page
      //.slice(0,2)
      let newResult = result.slice(startIndex, endIndex);
      response.status(200).send({ status: true, newResult });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = RestaurantController;
