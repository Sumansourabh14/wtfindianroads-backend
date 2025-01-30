const express = require("express");
const { createTrip, getAllTrips } = require("../controllers/tripController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.get("/all", getAllTrips);

module.exports = router;
