const express = require("express");
const shipController = require("./../controllers/shipController");

const router = express.Router();

router.route("/").get(shipController.getAllShip);
router.route("/:id").get(shipController.getOneShip);

module.exports = router;
