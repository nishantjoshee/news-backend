const router = require("express").Router();
const typeController = require("../controllers/newsTypeController");

router.route("/").get(typeController.getAllType);
router.route("/add").post(typeController.createType);
router.route("/update/:id").put(typeController.updateType);
router.route("/delete/:id").delete(typeController.deleteType);

module.exports = router;
