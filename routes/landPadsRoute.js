const express = require("express");
const landPadController = require("./../controllers/landPadController");

const router = express.Router();

router.route("/").get(landPadController.getAllLandPad);
router.route("/:id").get(landPadController.getOneLandpad);

module.exports = router;
