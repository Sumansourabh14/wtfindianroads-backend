const express = require("express");
const {
  signUpController,
  loginController,
} = require("../controllers/authController");
const router = express.Router();

router.post("/auth/sign-up", signUpController);
router.post("/auth/login", loginController);

module.exports = router;
