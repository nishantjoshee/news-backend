const models = require("../models");
const Tag = models.Tag;
const validator = require("fastest-validator");

//////////////////////////////////////////////////////////////////////////////////
// CREATE :Tag
exports.createTag = async (req, res) => {
  var data = req.body;

  const schema = {
    tag: { type: "string", optional: false, max: "20" },
  };
  const v = new validator();
  const validationResponse = v.validate(data, schema);

  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const oldTag = await Tag.findOne({
      where: { tag: req.body.tag },
    });
    if (oldTag) {
      res.status(400).json({
        status: "failed",
        message: "tag already exists",
      });
    } else {
      try {
        const result = await Tag.create(data);
        res.json({
          message: `Successfully created tag : ${result.tag}`,
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
// READ : Get all Tag

exports.getAllTag = async (req, res) => {
  try {
    const result = await Tag.findAll();
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
// UPDATE : Tag
exports.updateTag = async (req, res) => {
  var data = req.body;

  const schema = {
    tag: { type: "string", optional: false, max: "20" },
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
      await Tag.update(
        {
          tag: req.body.tag,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json({
        status: "success",
        message: "Successfully updated tag",
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
// DELETE : Tag
exports.deleteTag = async (req, res) => {
  try {
    await Tag.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: "Successfully deleted tag",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////
