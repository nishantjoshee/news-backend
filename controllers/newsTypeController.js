const models = require("../models");
const Type = models.NewsType;
const validator = require("fastest-validator");

//////////////////////////////////////////////////////////////////////////////////
// CREATE : News Type
exports.createType = async (req, res) => {
  var data = req.body;

  const schema = {
    type: { type: "string", optional: false, max: "20" },
  };
  const v = new validator();
  const validationResponse = v.validate(data, schema);

  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const oldType = await Type.findOne({
      where: { type: req.body.type },
    });
    if (oldType) {
      res.status(400).json({
        status: "failed",
        message: "type already exists",
      });
    } else {
      try {
        const result = await Type.create(data);
        res.json({
          message: `Successfully created news type : ${result.type}`,
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
// READ : Get all Type

exports.getAllType = async (req, res) => {
  try {
    const result = await Type.findAll();
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
// UPDATE : Type
exports.updateType = async (req, res) => {
  var data = req.body;

  const schema = {
    type: { type: "string", optional: false, max: "20" },
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
      await Type.update(
        {
          type: req.body.type,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json({
        status: "success",
        message: "Successfully updated type",
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
// DELETE : Type
exports.deleteType = async (req, res) => {
  try {
    await Type.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: "Successfully deleted type",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////
