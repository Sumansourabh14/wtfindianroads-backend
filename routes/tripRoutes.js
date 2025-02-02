const express = require("express");
const {
  createTrip,
  getAllTrips,
  getAllTripsBySelfUser,
} = require("../controllers/tripController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.get("/all", getAllTrips);
router.get("/self/all", authMiddleware, getAllTripsBySelfUser);

module.exports = router;
