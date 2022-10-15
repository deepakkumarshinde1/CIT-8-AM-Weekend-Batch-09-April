let CollectionModel = require("../model/CollectionModel");
let CollectionsController = {
  apiHome: function (request, response) {
    response.status(200).send({
      status: true,
    });
  },

  getCollectionTypes: async function (request, response) {
    try {
      let result = await CollectionModel.find();
      response.status(200).send({
        status: true,
        collection_type: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addCollectionsType: async function (request, response) {
    try {
      let result = await CollectionModel.insertMany(mealType);
      response.status(200).send({
        status: true,
        message: "meal type added successfully",
        result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = CollectionsController;
