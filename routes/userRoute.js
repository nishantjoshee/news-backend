const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUsers);
router.route("/add").post(userController.createUser);
router.route("/update/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteClient);

module.exports = router;
