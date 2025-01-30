const express = require("express");
const { createTrip } = require("../controllers/tripController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createTrip);

module.exports = router;
