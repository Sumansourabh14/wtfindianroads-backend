const express = require("express");
const {
  createComment,
  viewAllCommentsOfDiscussion,
} = require("../controllers/discussionController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createComment);
router.get("/all/:discussionId", viewAllCommentsOfDiscussion);

module.exports = router;
