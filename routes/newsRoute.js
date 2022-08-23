const path = require("path");
const router = require("express").Router();
const newsController = require("../controllers/newsController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/add", upload.single("image"), newsController.createNews);

router.route("/").get(newsController.getAllNews);
router.route("/:id").get(newsController.getNewsDetail);
router.route("/user/:id").get(newsController.getUserWiseNews);
router.route("/client/:id").get(newsController.getClientWiseNews);
router.route("/add").post(newsController.createNews);
router.route("/delete/:id").delete(newsController.deleteNews);

module.exports = router;
