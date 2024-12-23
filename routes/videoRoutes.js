const express = require("express");
const { uploadVideo } = require("../controllers/videoController");
const { optionalAuthMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/upload", optionalAuthMiddleware, uploadVideo);

module.exports = router;
