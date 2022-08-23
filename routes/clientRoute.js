const router = require("express").Router();
const clientController = require("../controllers/clientController");

router.route("/").get(clientController.getAllClient);
router.route("/add").post(clientController.createClient);
router.route("/update/:id").put(clientController.updateClient);
router.route("/delete/:id").delete(clientController.deleteClient);

module.exports = router;
