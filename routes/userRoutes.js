const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getSelfUser } = require("../controllers/userController");
const router = express.Router();

router.get("/self", authMiddleware, getSelfUser);

module.exports = router;
