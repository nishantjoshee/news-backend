const models = require("../models");
const User = models.User;
const validator = require("fastest-validator");

//////////////////////////////////////////////////////////////////////////////////
// CREATE : Create new user

exports.createUser = async (req, res) => {
  const data = req.body;

  const schema = {
    first_name: { type: "string", optional: false },
    last_name: { type: "string", optional: false },
    email: { type: "email", optional: false },
    role: { type: "string", optional: false },
    phone: { type: "string", optional: false, max: "10" },
  };

  const validationResponse = new validator().validate(data, schema);
  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const oldUser = await User.findOne({
      where: { email: data.email },
    });
    if (oldUser) {
      res.status(400).json({
        status: "failed",
        message: `email ${oldUser.email} is already taken`,
      });
    } else {
      try {
        const result = await User.create(data);
        res.json({
          message: `Successfully created user : ${result.first_name}`,
          data: result,
        });
      } catch (e) {
        res.status(500).json({
          status: "failed",
          message: e,
        });
      }
    }
  }
};

//////////////////////////////////////////////////////////////////////////////////
// GET : Get all client
exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json({
      status: "success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////
// UPDATE : Update client

exports.updateUser = async (req, res) => {
  var data = req.body;

  const schema = {
    first_name: { type: "string", optional: false },
    last_name: { type: "string", optional: false },
    email: { type: "email", optional: false },
    role: { type: "string", optional: false },
    phone: { type: "string", optional: false, max: "10" },
  };
  const v = new validator();
  const validationResponse = v.validate(data, schema);

  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    try {
      await User.update(data, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        status: "success",
        message: "Successfully updated user",
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e,
      });
    }
  }
};

//////////////////////////////////////////////////////////////////////////////////
// DELETE : Delete client

exports.deleteClient = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: "Successfully deleted user",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};
