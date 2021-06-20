const express = require("express");
const crewController = require("./../controllers/crewController");

const router = express.Router();

router.route("/").get(crewController.getAllCrew);
router.route("/:slug").get(crewController.getOneCrew);
module.exports = router;
