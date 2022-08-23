const router = require("express").Router();
const tagController = require("../controllers/tagController");

router.route("/").get(tagController.getAllTag);
router.route("/add").post(tagController.createTag);
router.route("/update/:id").put(tagController.updateTag);
router.route("/delete/:id").delete(tagController.deleteTag);

module.exports = router;
