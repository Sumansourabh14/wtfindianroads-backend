const express = require("express");
const {
  signUpController,
  loginController,
  isUsernameAvailableController,
} = require("../controllers/authController");
const router = express.Router();

router.post("/auth/sign-up", signUpController);
router.post("/auth/login", loginController);
router.post("/auth/check-username", isUsernameAvailableController);

module.exports = router;
