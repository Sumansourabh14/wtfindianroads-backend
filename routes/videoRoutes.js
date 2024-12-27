const express = require("express");
const { uploadVideo, getVideos } = require("../controllers/videoController");
const { optionalAuthMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/all", getVideos);
router.post("/upload", optionalAuthMiddleware, uploadVideo);

module.exports = router;
