const models = require("../models");
const Category = models.Category;
const validator = require("fastest-validator");

//////////////////////////////////////////////////////////////////////////////////

//  for creating category
exports.createCategory = async (req, res) => {
  var data = req.body;

  const schema = {
    name: { type: "string", optional: false, max: "20" },
  };
  const v = new validator();
  const validationResponse = v.validate(data, schema);

  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const oldCategory = await Category.findOne({
      where: data,
    });
    if (oldCategory) {
      res.status(400).json({
        status: "failed",
        message: "category already exists",
      });
    } else {
      try {
        const result = await Category.create(data);
        res.json({
          message: `Successfully created category : ${result.name}`,
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

// for getting all categories
exports.getAllCategories = async (req, res) => {
  try {
    const result = await Category.findAll({});
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: "Unable to fetch categories",
      message: e,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////

// for updating category
exports.updateCategory = async (req, res) => {
  var data = req.body;

  const schema = {
    name: { type: "string", optional: false, max: "20" },
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
      await Category.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.json({
        status: "success",
        message: "Successfully updated category",
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

// for deleting category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: `Successfully deleted category`,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e,
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////
