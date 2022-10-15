const MenuItemModel = require("../model/MenuItemModel");

module.exports.getMenuItemsByRestId = async (request, response) => {
  let id = request.params.id;
  try {
    let result = await MenuItemModel.find({ restaurantId: id });
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "server error",
      error,
    });
  }
};
