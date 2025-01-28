const express = require("express");
const {
  getRandomRoadTip,
  postUserFeedback,
} = require("../controllers/dataController");
const router = express.Router();

router.get("/road-safety-tips/random", getRandomRoadTip);
router.post("/create-user-feedback", postUserFeedback);

module.exports = router;
