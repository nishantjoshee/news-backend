const models = require("../models");
const News = models.News;
const validator = require("fastest-validator");
const path = require("path");

//////////////////////////////////////////////////////////////////////////////////

// CREATE : News

exports.createNews = async (req, res) => {
  var data = req.body;
  const schema = {
    title: { type: "string", optional: false },
    description: { type: "string", optional: false },
    content: { type: "string", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(data, schema);

  if (validationResponse != true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    console.log(data.user_id);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Select image to upload" });
    } else {
      try {
        const result = await News.create({
          title: data.title,
          description: data.description,
          content: data.content,
          featured_image: req.file.path,
          user_id: data.user_id,
          client_id: data.client_id,
        });
        res.status(201).json({
          status: "success",
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

// READ : All News

exports.getAllNews = async (req, res) => {
  try {
    const result = await News.findAll({
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: models.Client,
          as: "client",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "title",
        "description",
        "featured_image",
        "createdAt",
        "updatedAt",
      ],
    });
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
// READ : Get userwise news

exports.getUserWiseNews = async (req, res) => {
  try {
    const result = await News.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: models.Client,
          as: "client",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "title", "description", "createdAt", "updatedAt"],
    });
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

exports.getClientWiseNews = async (req, res) => {
  try {
    const result = await News.findAll({
      where: { client_id: req.params.id },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: models.Client,
          as: "client",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "title", "description", "createdAt", "updatedAt"],
    });
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

// READ : News Detail
exports.getNewsDetail = async (req, res) => {
  const news = await News.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (news) {
    res.json({
      status: "success",
      data: news,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "news not found",
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////

// UPDATE : Update news

//////////////////////////////////////////////////////////////////////////////////

// DELETE : Delete news
exports.deleteNews = async (req, res) => {
  const news = await News.findOne({ where: { id: req.params.id } });
  if (news) {
    await News.destroy({ where: { id: req.params.id } });
    res.json({
      status: "success",
      message: "successfully deleted news",
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "news not found",
    });
  }
};

//////////////////////////////////////////////////////////////////////////////////
