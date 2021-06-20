const express = require("express");
const rocketController = require("./../controllers/rocketController");

const router = express.Router();

router.route("/").get(rocketController.getAllRocket);
router.route("/:id").get(rocketController.getOneRocket);

module.exports = router;
