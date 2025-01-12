const express = require("express");
const { getRandomRoadTip } = require("../controllers/dataController");
const router = express.Router();

router.get("/road-safety-tips/random", getRandomRoadTip);

module.exports = router;
