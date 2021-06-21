const authController = require("./../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updatemypassword",
  authController.protect,
  authController.updatePassword
);
module.exports = router;
