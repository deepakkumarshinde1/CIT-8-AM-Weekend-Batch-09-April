const UsersModel = require("../model/UsersModel");

const UsersController = {
  userSignUp: async (request, response) => {
    let data = request.body;

    let newUser = new UsersModel({
      email: data.email,
      password: data.password,
      mobile: data.mobile,
      full_name: data.full_name,
    });

    let result = await newUser.save();

    response.status(200).send({
      status: true,
      result,
    });
  },
  userLogin: (request, response) => {
    response.status(200).send({
      status: true,
    });
  },
};

module.exports = UsersController;
