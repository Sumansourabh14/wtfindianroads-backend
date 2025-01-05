const express = require("express");
const {
  signUpController,
  loginController,
  isUsernameAvailableController,
} = require("../controllers/authController");
const router = express.Router();

router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.post("/check-username", isUsernameAvailableController);

module.exports = router;
