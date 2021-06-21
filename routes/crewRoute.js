const express = require("express");
const crewController = require("./../controllers/crewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect, crewController.getAllCrew);
router.route("/:slug").get(crewController.getOneCrew);
module.exports = router;
