const express = require("express");
const {
  uploadVideo,
  getVideos,
  getVideoDetails,
} = require("../controllers/videoController");
const { optionalAuthMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/all", getVideos);
router.get("/single/:id", getVideoDetails);
router.post("/upload", optionalAuthMiddleware, uploadVideo);

module.exports = router;
