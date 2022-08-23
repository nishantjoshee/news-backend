const models = require("../models");
const Client = models.Client;
const validator = require("fastest-validator");

//////////////////////////////////////////////////////////////////////////////////
// CREATE : Create new client

exports.createClient = async (req, res) => {
  const data = req.body;

  const schema = {
    name: { type: "string", optional: false },
    address: { type: "string", optional: false },
    about: { type: "string", optional: false },
    phone: { type: "string", optional: false, max: "10" },
  };

  const validationResponse = new validator().validate(data, schema);
  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const oldClient = await Client.findOne({
      where: { name: data.name },
    });
    if (oldClient) {
      res.status(400).json({
        status: "failed",
        message: `client name ${oldClient.name} already exists`,
      });
    } else {
      try {
        const result = await Client.create(data);
        res.json({
          message: `Successfully created client : ${result.name}`,
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
exports.getAllClient = async (req, res) => {
  try {
    const result = await Client.findAll();
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

exports.updateClient = async (req, res) => {
  var data = req.body;

  const schema = {
    name: { type: "string", optional: false },
    address: { type: "string", optional: false },
    about: { type: "string", optional: false },
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
      await Client.update(data, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        status: "success",
        message: "Successfully updated client",
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
    await Client.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: "Successfully deleted client",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};
